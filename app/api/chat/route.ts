import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ---------------------------------------------------------------------------
// Portfolio context — factual information fed to the model as a system prompt
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a portfolio assistant for David Alonso. Your only job is to answer questions about David — his background, education, projects, skills, and career interests. Be helpful, concise, and professional. Sound human, not robotic. Do not invent facts. If information is not covered below, say it is not available in the portfolio.

--- ABOUT DAVID ---
David Alonso is a Data Science student at Minot State University (Minot, North Dakota), pursuing a B.S. in Data Science with a Minor in Computer Science. He also has a prior background in Industrial Engineering from Universidad Americana in Asunción, Paraguay.

His core interests are data analytics, business intelligence, product analytics, user behavior analysis, and building data-driven applications. He is actively looking for data analyst, BI, and product analytics roles, as well as internship opportunities.

--- PROJECTS ---

1. Beaver App
A full-stack Progressive Web App built to improve student engagement at a university campus. Features include campus events, social features, and daily games. The app captures user interactions (likes, bookmarks, attendance) and is designed with analytics and KPI monitoring in mind. It has a live deployment and a public GitHub repository.
Stack: Next.js, TypeScript, PostgreSQL, Tailwind CSS, PWA.

2. Predictive Anomaly Detection in Multivariate Oil Well Sensor Data
David's Data Science capstone project. An early anomaly detection model that identifies abnormal patterns in operational oil well sensor data. It uses preprocessing, time-series windowing, and feature-level analysis to surface operational risk signals.
Stack: Python, scikit-learn, Pandas, NumPy.

3. AI Voice Assistant
An end-to-end voice assistant that interprets spoken requests, retrieves structured information via SQL, and executes actions through real-time API integrations. Capabilities include speech processing, LLM-based intent interpretation, contact lookup, automated phone calls, and calendar scheduling. Presented at an academic showcase.
Stack: Python, LLM APIs, SQL, Speech Processing.
Public GitHub repository available.

--- SKILLS ---
SQL, Python, Power BI, PostgreSQL, Data Analysis, Data Visualization, Dashboarding, Product Analytics, Next.js, TypeScript.

--- CONTACT ---
David can be reached through the contact section of his portfolio. He has a LinkedIn profile, a GitHub profile, and email addresses listed on the site. Encourage visitors to use those.

--- BEHAVIOR RULES ---
- Only answer questions about David Alonso and his portfolio.
- If asked about job interest, confirm he is open to analytics, BI, product/data-focused roles, and internships.
- If asked for contact details, direct the visitor to the contact section of the portfolio.
- Keep answers concise — one to three short paragraphs at most.
- Do not make up projects, skills, or facts not listed above.`;

// ---------------------------------------------------------------------------
// Telegram notification (non-fatal)
// ---------------------------------------------------------------------------
async function notifyTelegram(message: string, reply: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text =
    `New portfolio chat message\n\n` +
    `User said:\n"${message}"\n\n` +
    `Assistant replied:\n"${reply}"`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
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

  // Validate message field
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

  // Require OpenAI key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "OpenAI API key is not configured" },
      { status: 500 }
    );
  }

  // Generate reply
  let reply: string;
  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 300,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    reply =
      completion.choices[0]?.message?.content?.trim() ??
      "Sorry, I'm having trouble answering right now. Please try again in a moment.";
  } catch {
    return NextResponse.json(
      {
        ok: true,
        reply:
          "Sorry, I'm having trouble answering right now. Please try again in a moment.",
      }
    );
  }

  // Notify David via Telegram (non-fatal)
  try {
    await notifyTelegram(message, reply);
  } catch {
    // Telegram failure must not affect the visitor
  }

  return NextResponse.json({ ok: true, reply });
}
