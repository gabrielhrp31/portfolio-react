import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  createQuoteRequest,
  listQuoteRequests,
  updateQuoteRequestEmailStatus,
} from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

function parseString(val) {
  return String(val || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await listQuoteRequests());
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load quote requests" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = parseString(body?.name);
    const email = parseString(body?.email);
    const phone = parseString(body?.phone);
    const budget = parseString(body?.budget);
    const message = parseString(body?.message);
    const source = parseString(body?.source).slice(0, 64);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "name, email e message são obrigatórios" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "email inválido" }, { status: 400 });
    }

    // 1) Sempre salva no backend primeiro
    const saved = await createQuoteRequest({
      name,
      email,
      phone,
      budget,
      message,
      source,
      emailStatus: "pending",
    });

    const to =
      process.env.CONTACT_TO_EMAIL || process.env.CONTACT_SMTP_TO || "";
    const smtpHost = process.env.CONTACT_SMTP_HOST || "";
    const smtpPort = Number(process.env.CONTACT_SMTP_PORT || 587);
    const smtpUser = process.env.CONTACT_SMTP_USER || "";
    const smtpPass = process.env.CONTACT_SMTP_PASS || "";
    const smtpFrom =
      process.env.CONTACT_SMTP_FROM ||
      process.env.CONTACT_FROM_EMAIL ||
      to;

    const smtpConfigured = Boolean(smtpHost) && Boolean(to);
    const subject = `Solicitação de orçamento — ${name}`;
    const text = [
      "Nova solicitação de orçamento:",
      "",
      `ID: #${saved.id}`,
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefone: ${phone}` : null,
      budget ? `Valor estimado: ${budget}` : null,
      source ? `Origem: ${source}` : null,
      "",
      "Mensagem:",
      message,
      "",
      "— enviado via formulário do site",
    ]
      .filter(Boolean)
      .join("\n");

    // 2) Envia email quando SMTP estiver configurado
    if (!smtpConfigured) {
      await updateQuoteRequestEmailStatus(saved.id, "skipped");
      console.log("[contact/quote] salvo sem SMTP", {
        id: saved.id,
        name,
        email,
        source,
      });
      return NextResponse.json(
        {
          ok: true,
          id: saved.id,
          mode: "saved",
          emailStatus: "skipped",
        },
        { status: 201 }
      );
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: String(process.env.CONTACT_SMTP_SECURE || "false") === "true",
        auth:
          smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
      });

      await transporter.sendMail({
        from: smtpFrom,
        to,
        replyTo: email,
        subject,
        text,
      });

      await updateQuoteRequestEmailStatus(saved.id, "sent");
      return NextResponse.json(
        { ok: true, id: saved.id, mode: "smtp", emailStatus: "sent" },
        { status: 201 }
      );
    } catch (mailError) {
      console.error("[contact/quote] email failed", mailError);
      await updateQuoteRequestEmailStatus(saved.id, "failed");
      // Solicitação já está salva — não falha o fluxo do usuário
      return NextResponse.json(
        {
          ok: true,
          id: saved.id,
          mode: "saved",
          emailStatus: "failed",
          warning: "Salvo, mas o email não foi enviado",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao registrar solicitação" },
      { status: 500 }
    );
  }
}
