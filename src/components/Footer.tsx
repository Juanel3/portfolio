const email = "juanmf3@outlook.com";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Juan Flores</p>
          <a
            href={`mailto:${email}`}
            className="mt-1 block text-sm text-muted hover:text-accent"
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
