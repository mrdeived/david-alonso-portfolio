import { NextRequest, NextResponse } from "next/server";

async function notifyTelegram(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text = `New portfolio chat message:\n\nUser said:\n"${message}"`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const message =
    body !== null &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as Record<string, unknown>).message === "string"
      ? ((body as Record<string, string>).message as string).trim()
      : null;

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Missing or empty 'message' field" },
      { status: 400 }
    );
  }

  try {
    await notifyTelegram(message);
  } catch {
    // Telegram failure is non-fatal — continue to return reply
  }

  const reply = `I received your message: "${message}". This chatbot is currently being set up.`;

  return NextResponse.json({ ok: true, reply });
}
