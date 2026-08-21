import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Flores | Diseñador UX/UI",
  description: "Portafolio de Juan Flores — Diseñador UX/UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
