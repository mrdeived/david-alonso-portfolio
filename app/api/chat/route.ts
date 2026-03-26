import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ---------------------------------------------------------------------------
// System prompt — conversational guide to David's portfolio
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a friendly guide for David Alonso's portfolio. Visitors ask you questions about David — his background, projects, skills, and career interests.

Keep your answers short and natural. 2–4 sentences is usually enough. Don't dump everything you know — just answer what was asked. Avoid bullet lists unless the question clearly calls for one. Sound like a real person helping out, not a formal document.

If you don't know something, say so simply. Don't make up facts.

--- ABOUT DAVID ---
David is a Data Science student at Minot State University (Minot, North Dakota), finishing a B.S. in Data Science with a Minor in Computer Science. GPA: 3.674. He also studied Industrial Engineering at Universidad Americana in Paraguay before moving to the US.

He's interested in data analytics, BI, product analytics, and building data-driven products. He's looking for analyst, BI, or product/data-focused roles and internships.

--- PROJECTS ---

Beaver App — A full-stack PWA he built to improve student engagement on campus. It has events, social features, and daily games, and tracks user interactions (likes, bookmarks, attendance) with analytics and KPI monitoring in mind. Live app + public GitHub.
Stack: Next.js, TypeScript, PostgreSQL, Tailwind CSS.

Anomaly Detection — His Data Science capstone. An early anomaly detection model for oil well sensor data that flags operational risk signals using preprocessing, time-series windowing, and feature analysis.
Stack: Python, scikit-learn, Pandas, NumPy.

AI Voice Assistant — An end-to-end voice assistant that takes spoken requests and executes them: SQL-backed contact lookup, automated calls, calendar scheduling. Presented at an academic showcase. Public GitHub.
Stack: Python, LLM APIs, SQL, Speech Processing.

--- SKILLS ---
SQL, Python, Power BI, PostgreSQL, Data Analysis, Data Visualization, Dashboarding, Product Analytics, Next.js, TypeScript.

--- CONTACT ---
David's contact info (email, LinkedIn, GitHub) is in the contact section of his portfolio. Point visitors there.

--- RULES ---
- Only answer about David and his portfolio.
- Keep it conversational and concise.
- Don't repeat info the visitor didn't ask about.
- If asked about jobs, say he's open to analytics, BI, and product/data roles.
- If asked for contact details, point to the contact section.`;

// ---------------------------------------------------------------------------
// Lightweight keyword-based topic label for Telegram
// ---------------------------------------------------------------------------
function inferTopic(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("beaver") || m.includes("pwa") || m.includes("campus")) return "Beaver App";
  if (m.includes("anomaly") || m.includes("oil") || m.includes("sensor") || m.includes("capstone")) return "Anomaly Detection";
  if (m.includes("voice") || m.includes("assistant") || m.includes("jarvis") || m.includes("speech")) return "AI Voice Assistant";
  if (m.includes("education") || m.includes("university") || m.includes("degree") || m.includes("gpa") || m.includes("minot") || m.includes("study")) return "Education";
  if (m.includes("skill") || m.includes("stack") || m.includes("tech") || m.includes("python") || m.includes("sql") || m.includes("power bi")) return "Skills";
  if (m.includes("job") || m.includes("role") || m.includes("hire") || m.includes("work") || m.includes("intern") || m.includes("opportunit")) return "Job Interests";
  if (m.includes("contact") || m.includes("email") || m.includes("reach") || m.includes("linkedin")) return "Contact";
  if (m.includes("project") || m.includes("built") || m.includes("portfolio")) return "Projects";
  return "General";
}

// ---------------------------------------------------------------------------
// Telegram notification (non-fatal)
// ---------------------------------------------------------------------------
async function notifyTelegram(
  message: string,
  reply: string
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const topic = inferTopic(message);
  const text =
    `New portfolio chat — Topic: ${topic}\n\n` +
    `Visitor asked:\n"${message}"\n\n` +
    `Assistant replied:\n"${reply}"`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface HistoryEntry {
  role: "user" | "assistant";
  content: string;
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  if (body === null || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;

  // Validate message
  const message =
    typeof raw.message === "string" ? raw.message.trim() : null;

  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Missing or empty 'message' field" },
      { status: 400 }
    );
  }

  // Parse optional history (last 8 turns max)
  const rawHistory = Array.isArray(raw.history) ? raw.history : [];
  const history: HistoryEntry[] = rawHistory
    .filter(
      (e): e is HistoryEntry =>
        e !== null &&
        typeof e === "object" &&
        (e.role === "user" || e.role === "assistant") &&
        typeof e.content === "string"
    )
    .slice(-8);

  // Require OpenAI key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "OpenAI API key is not configured" },
      { status: 500 }
    );
  }

  // Build message list: system + history + current user message
  const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message },
  ];

  // Generate reply
  let reply: string;
  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 200,
      messages: openaiMessages,
    });

    reply =
      completion.choices[0]?.message?.content?.trim() ??
      "Sorry, something went wrong on my side. Please try again in a moment.";
  } catch {
    return NextResponse.json({
      ok: true,
      reply: "Sorry, something went wrong on my side. Please try again in a moment.",
    });
  }

  // Notify David via Telegram (non-fatal)
  try {
    await notifyTelegram(message, reply);
  } catch {
    // Telegram failure must not affect the visitor
  }

  return NextResponse.json({ ok: true, reply });
}
