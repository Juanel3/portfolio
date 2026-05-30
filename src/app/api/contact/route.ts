import { NextResponse } from "next/server";
import { Resend } from "resend";

const contactEmail = process.env.CONTACT_EMAIL ?? "juanmf3@outlook.com";

export async function POST(request: Request) {
  try {
    const { name, message } = (await request.json()) as {
      name?: string;
      message?: string;
    };

    const trimmedName = name?.trim() ?? "";
    const trimmedMessage = message?.trim() ?? "";

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json(
        { error: "Nombre y mensaje son requeridos." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "El envío de correo no está configurado." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to: contactEmail,
      subject: `Contacto desde portafolio — ${trimmedName}`,
      text: [`Nombre: ${trimmedName}`, "", "Mensaje:", trimmedMessage].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 },
    );
  }
}
