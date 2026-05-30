import type {
  GenieEffectControls,
  GenieEffectOptions,
  GenieTarget,
} from "@adi1816/genie-effect";
import { runGenieEffect } from "@adi1816/genie-effect";

type Motion = {
  direction: "up" | "down";
  finalRect: DOMRect;
  initialRect: DOMRect;
};

const SLIDE_END_FRACTION = 0.5;
const TRANSLATE_START_FRACTION = 0.4;
const GENIE_CURVE_ROWS = [0, 0.12, 0.25, 0.4, 0.58, 0.75, 0.88, 1];

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

function easeInOutQuad(value: number) {
  return value < 0.5 ? 2 * value * value : 1 - (-2 * value + 2) ** 2 / 2;
}

function toDomRect(target: GenieTarget) {
  if (
    typeof target === "object" &&
    target !== null &&
    "getBoundingClientRect" in target
  ) {
    return (target as HTMLElement).getBoundingClientRect();
  }
  if (typeof DOMRect !== "undefined" && target instanceof DOMRect) {
    return target;
  }
  return new DOMRect(target.left, target.top, target.width, target.height);
}

function resolveMotion(
  source: HTMLElement,
  target: GenieTarget,
  direction: "auto" | "up" | "down" = "auto",
): Motion {
  const initialRect = source.getBoundingClientRect();
  const finalRect = toDomRect(target);
  const targetCenterY = finalRect.top + finalRect.height / 2;
  const sourceCenterY = initialRect.top + initialRect.height / 2;
  const resolvedDirection =
    direction === "auto"
      ? targetCenterY < sourceCenterY
        ? "up"
        : "down"
      : direction;

  return { direction: resolvedDirection, finalRect, initialRect };
}

function screenY(axisY: number, direction: Motion["direction"]) {
  return direction === "down" ? axisY : -axisY;
}

function getCurveRow(motion: Motion, progress: number, rowProgress: number) {
  const { direction, finalRect, initialRect } = motion;
  const axisInitialFar =
    direction === "down" ? initialRect.top : -initialRect.bottom;
  const axisInitialNear =
    direction === "down" ? initialRect.bottom : -initialRect.top;
  const axisFinalFar = direction === "down" ? finalRect.top : -finalRect.bottom;
  const axisFinalNear =
    direction === "down" ? finalRect.bottom : -finalRect.top;
  const axisDistance = axisFinalFar - axisInitialFar;
  const slideProgress = easeOutCubic(clamp(progress / SLIDE_END_FRACTION));
  const translateProgress = easeInOutQuad(
    clamp((progress - TRANSLATE_START_FRACTION) / (1 - TRANSLATE_START_FRACTION)),
  );
  const translation = translateProgress * axisDistance;
  const farEdgeY = axisInitialFar + translation;
  const nearEdgeY = Math.min(axisInitialNear + translation, axisFinalNear);
  const farToNearProgress = direction === "down" ? rowProgress : 1 - rowProgress;
  const axisY = farEdgeY * (1 - farToNearProgress) + nearEdgeY * farToNearProgress;
  const curveProgress =
    axisDistance === 0
      ? 1
      : easeInOutQuad(clamp((axisY - axisInitialFar) / axisDistance));
  const leftTargetX =
    initialRect.left + (finalRect.left - initialRect.left) * slideProgress;
  const rightTargetX =
    initialRect.right + (finalRect.right - initialRect.right) * slideProgress;
  const leftX = initialRect.left + (leftTargetX - initialRect.left) * curveProgress;
  const rightX =
    initialRect.right + (rightTargetX - initialRect.right) * curveProgress;

  return { leftX, rightX, y: screenY(axisY, direction) };
}

function getGenieFrame(motion: Motion, progress: number) {
  const rows = GENIE_CURVE_ROWS.map((row) => getCurveRow(motion, progress, row));
  const minX = Math.min(...rows.map((row) => row.leftX));
  const maxX = Math.max(...rows.map((row) => row.rightX));
  const minY = Math.min(...rows.map((row) => row.y));
  const maxY = Math.max(...rows.map((row) => row.y));
  const width = Math.max(1, maxX - minX);
  const height = Math.max(1, maxY - minY);
  const rightSide = rows.map((row) => `${row.rightX - minX}px ${row.y - minY}px`);
  const leftSide = [...rows]
    .reverse()
    .map((row) => `${row.leftX - minX}px ${row.y - minY}px`);

  return {
    clipPath: `polygon(${[...rightSide, ...leftSide].join(", ")})`,
    height,
    left: minX,
    top: minY,
    width,
  };
}

function prepareClone(source: HTMLElement, initialRect: DOMRect) {
  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  clone.setAttribute("aria-hidden", "true");
  clone.style.animation = "none";
  clone.style.height = `${initialRect.height}px`;
  clone.style.width = `${initialRect.width}px`;
  clone.style.position = "absolute";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.margin = "0";
  clone.style.pointerEvents = "none";
  clone.style.transform = "none";
  clone.style.transformOrigin = "top left";
  return clone;
}

/** Genie invertido: restaurar ventana desde el dock (basado en @adi1816/genie-effect). */
export function runGenieRestore(
  source: HTMLElement,
  target: GenieTarget,
  options: GenieEffectOptions = {},
): GenieEffectControls {
  if (typeof window === "undefined") {
    return { cancel: () => undefined, finished: Promise.resolve() };
  }

  const reducedMotion =
    options.reducedMotion ??
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const duration = reducedMotion ? 80 : (options.duration ?? 860);
  const motion = resolveMotion(source, target, options.direction ?? "auto");
  const parent =
    options.layerParent ??
    source.closest<HTMLElement>("[data-genie-root]") ??
    document.body;

  const layer = document.createElement("div");
  const panel = document.createElement("div");
  const clone = prepareClone(source, motion.initialRect);

  layer.className = ["genie-effect-layer", options.className]
    .filter(Boolean)
    .join(" ");
  layer.style.zIndex = getComputedStyle(source).zIndex || "2147483000";
  panel.className = "genie-effect-panel";
  panel.appendChild(clone);
  layer.appendChild(panel);
  parent.appendChild(layer);

  const originalOpacity = source.style.opacity;
  const originalPointerEvents = source.style.pointerEvents;
  source.style.opacity = "0";
  source.style.pointerEvents = "none";

  let frameId: number | null = null;
  let isDone = false;
  let resolveFinished: () => void;
  const finished = new Promise<void>((resolve) => {
    resolveFinished = resolve;
  });

  const settle = (state: "complete" | "cancel") => {
    if (isDone) return;
    isDone = true;
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    layer.remove();
    if (state === "cancel" || options.restoreSourceOnComplete !== false) {
      source.style.opacity = originalOpacity;
      source.style.pointerEvents = originalPointerEvents;
    }
    if (state === "complete") options.onComplete?.();
    else options.onCancel?.();
    resolveFinished();
  };

  options.onStart?.();
  const startedAt = performance.now();

  const animate = (timestamp: number) => {
    const progress = clamp((timestamp - startedAt) / duration);
    const genieProgress = 1 - progress;
    const frame = getGenieFrame(motion, genieProgress);
    const scaleX = frame.width / Math.max(motion.initialRect.width, 1);
    const scaleY = frame.height / Math.max(motion.initialRect.height, 1);
    const fadeIn = clamp(progress / 0.2);

    panel.style.clipPath = frame.clipPath;
    panel.style.height = `${frame.height}px`;
    panel.style.width = `${frame.width}px`;
    panel.style.opacity = `${fadeIn}`;
    panel.style.transform = `translate3d(${frame.left}px, ${frame.top}px, 0)`;
    clone.style.transform = `scale(${scaleX}, ${scaleY})`;

    options.onUpdate?.(progress);

    if (progress < 1) {
      frameId = window.requestAnimationFrame(animate);
      return;
    }

    source.style.opacity = originalOpacity || "";
    source.style.pointerEvents = originalPointerEvents || "";
    settle("complete");
  };

  frameId = window.requestAnimationFrame(animate);

  return {
    cancel: () => settle("cancel"),
    finished,
  };
}

export { runGenieEffect };
