"use client";

import Image from "next/image";
import { useState } from "react";

const email = "juanmf3@outlook.com";
const linkedin = "https://www.linkedin.com/in/juan-flores-91b77a3b6";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const subject = encodeURIComponent(
      `Contacto desde portafolio — ${trimmedName}`,
    );
    const body = encodeURIComponent(
      [`Nombre: ${trimmedName}`, "", trimmedMessage].join("\n"),
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setStatusMessage(
      "Se abrió tu app de correo con el mensaje listo. Pulsa enviar para completarlo.",
    );
  };

  return (
    <section
      id="contacto"
      className="contact-section relative overflow-hidden bg-white px-6 pt-8 pb-24 sm:pt-10"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-blue-400/40 blur-[100px]" />
        <div className="hero-blob hero-blob-2 absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/45 blur-[90px]" />
        <div className="hero-blob hero-blob-3 absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-indigo-300/35 blur-[100px]" />
        <div className="hero-blob hero-blob-4 absolute right-1/4 top-16 h-56 w-56 rounded-full bg-blue-200/40 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Contacto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
            Trabajemos juntos en tu próximo proyecto.
          </p>
        </div>

        <div className="contact-window overflow-hidden rounded-[28px] border border-white/90 bg-white/80 font-[system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] shadow-[0_24px_64px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl">
          <div className="flex min-h-[420px] flex-col sm:min-h-[460px] sm:flex-row">
            <aside className="contact-info-bar flex shrink-0 flex-col sm:w-[260px] lg:w-[280px]">
              <div className="contact-info-bar-header flex flex-col items-center px-6 pb-6 pt-8 text-center sm:pt-10">
                <div className="contact-info-avatar relative h-24 w-24 overflow-hidden rounded-full bg-white ring-4 ring-white/80 sm:h-28 sm:w-28">
                  <Image
                    src="/persona.png"
                    alt="Juan Flores"
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 640px) 96px, 112px"
                  />
                </div>
                <p className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
                  Juan Flores
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 px-4 pb-6 sm:px-5 sm:pb-8">
                <a
                  href={`mailto:${email}`}
                  className="contact-profile-row group w-full"
                >
                  <Image
                    src="/dock/mail.png"
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] shrink-0 object-contain"
                    draggable={false}
                  />
                  <span className="contact-profile-row-text">
                    <span className="contact-profile-row-label">Correo</span>
                    <span className="contact-profile-row-value">{email}</span>
                  </span>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-profile-row group w-full"
                >
                  <img
                    src="/software/linkedin.svg"
                    alt=""
                    className="h-[22px] w-[22px] shrink-0"
                    draggable={false}
                  />
                  <span className="contact-profile-row-text">
                    <span className="contact-profile-row-label">LinkedIn</span>
                    <span className="contact-profile-row-value">Ver perfil</span>
                  </span>
                </a>
              </div>
            </aside>

            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-1 flex-col bg-white px-5 py-6 sm:px-8 sm:py-8"
            >
              <div className="mail-compose-header border-b border-zinc-200/70 pb-5">
                <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">
                  ¿Colaboramos en un proyecto?
                </h3>

                <div className="mt-5 text-sm leading-relaxed text-black sm:text-base">
                  <p>Escríbeme y te responderé lo antes posible.</p>
                </div>
              </div>

              <label className="contact-field mt-5">
                <span className="contact-field-label">Nombre</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  required
                  className="contact-field-input"
                />
              </label>

              <label className="contact-field mt-5 flex min-h-0 flex-1 flex-col">
                <span className="contact-field-label">Mensaje</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  required
                  className="contact-field-textarea min-h-[160px] flex-1"
                />
              </label>

              <div className="mt-6">
                {statusMessage && (
                  <p
                    className="mb-3 text-center text-sm text-emerald-600"
                    role="status"
                  >
                    {statusMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="mail-email-btn flex w-full items-center justify-center gap-2"
                >
                  Enviar mensaje
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
