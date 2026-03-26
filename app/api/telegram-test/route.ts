import { NextResponse } from "next/server";

async function sendTelegramMessage(): Promise<NextResponse> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Missing Telegram environment variables" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Test notification from your Next.js portfolio.",
        }),
      }
    );

    return NextResponse.json({ ok: true, telegramStatus: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return sendTelegramMessage();
}

export async function GET() {
  return sendTelegramMessage();
}
