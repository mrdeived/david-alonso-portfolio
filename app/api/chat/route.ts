import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// System prompt — conversational guide to David's portfolio
// ---------------------------------------------------------------------------
const BASE_SYSTEM_PROMPT = `You are a friendly guide for David Alonso's portfolio. Visitors ask you questions about David — his background, projects, skills, and career interests.

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
// Visitor context block appended to system prompt when known info exists
// ---------------------------------------------------------------------------
function buildVisitorContext(visitor: {
  name: string | null;
  company: string | null;
  notes: string | null;
}): string {
  const lines: string[] = [];
  if (visitor.name) lines.push(`Name: ${visitor.name}`);
  if (visitor.company) lines.push(`Company: ${visitor.company}`);
  if (visitor.notes) lines.push(`Context: ${visitor.notes}`);
  if (lines.length === 0) return "";
  return `\n\n--- VISITOR CONTEXT ---\nYou already know this about the person you're talking to:\n${lines.join("\n")}\nUse this naturally in your replies when relevant. Don't repeat it back verbatim.`;
}

// ---------------------------------------------------------------------------
// Lightweight keyword-based topic label
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
// Update rolling notes/summary for the visitor
// ---------------------------------------------------------------------------
function buildUpdatedNotes(existing: string | null, topic: string): string {
  if (topic === "General") return existing ?? "";

  const topicsMatch = existing?.match(/Topics: ([^|]+)/);
  const existingTopics = topicsMatch
    ? topicsMatch[1].split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (!existingTopics.includes(topic)) {
    existingTopics.push(topic);
  }

  const topicsPart = `Topics: ${existingTopics.join(", ")}`;

  // Preserve anything after the topics section (e.g. "Introduced as: ...")
  const rest = existing?.replace(/Topics: [^|]+\|?/, "").trim() ?? "";
  return rest ? `${topicsPart} | ${rest}` : topicsPart;
}

// ---------------------------------------------------------------------------
// Lightweight identity extraction from a single message
// ---------------------------------------------------------------------------
function extractIdentity(message: string): {
  name?: string;
  email?: string;
  company?: string;
} {
  const result: { name?: string; email?: string; company?: string } = {};

  // Email
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) result.email = emailMatch[0].toLowerCase();

  // Name: "my name is X", "I'm X", "I am X", "call me X", "this is X"
  const nameMatch = message.match(
    /(?:my name is|i'm|i am|call me|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/
  );
  if (nameMatch) result.name = nameMatch[1].trim();

  // Company: "from X Corp", "at Acme", "I work at X" — best effort, proper noun only
  const companyMatch = message.match(
    /(?:from|at|with|work(?:ing)? (?:for|at))\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s*[,.]|\s+and\b|$)/
  );
  if (companyMatch) {
    const candidate = companyMatch[1].trim();
    // Skip single common words that are likely not company names
    const skip = new Set(["home", "school", "work", "here", "there", "the"]);
    if (candidate.length > 2 && !skip.has(candidate.toLowerCase())) {
      result.company = candidate;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Telegram notification (non-fatal)
// ---------------------------------------------------------------------------
async function notifyTelegram(
  message: string,
  reply: string,
  visitor: { name: string | null; email: string | null; company: string | null; notes: string | null }
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const visitorLines: string[] = [];
  if (visitor.name) visitorLines.push(`  Name: ${visitor.name}`);
  if (visitor.email) visitorLines.push(`  Email: ${visitor.email}`);
  if (visitor.company) visitorLines.push(`  Company: ${visitor.company}`);

  const visitorBlock =
    visitorLines.length > 0
      ? `Visitor:\n${visitorLines.join("\n")}\n\n`
      : "Visitor: Unknown\n\n";

  const summaryBlock = visitor.notes
    ? `\nSummary:\n${visitor.notes}`
    : "";

  const text =
    `New portfolio chat\n\n` +
    visitorBlock +
    `Latest message:\n"${message}"\n\n` +
    `Assistant reply:\n"${reply}"` +
    summaryBlock;

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
  const message = typeof raw.message === "string" ? raw.message.trim() : null;
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Missing or empty 'message' field" },
      { status: 400 }
    );
  }

  // Validate sessionKey
  const sessionKey =
    typeof raw.sessionKey === "string" ? raw.sessionKey.trim() : null;
  if (!sessionKey) {
    return NextResponse.json(
      { ok: false, error: "Missing 'sessionKey' field" },
      { status: 400 }
    );
  }

  // Parse optional conversation history (last 8 turns)
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

  // --- Persist: find or create visitor, save user message ---
  let visitor: {
    id: string;
    name: string | null;
    email: string | null;
    company: string | null;
    notes: string | null;
  } | null = null;

  try {
    visitor = await prisma.visitor.upsert({
      where: { sessionKey },
      create: { sessionKey },
      update: { lastSeenAt: new Date() },
      select: { id: true, name: true, email: true, company: true, notes: true },
    });

    await prisma.conversationMessage.create({
      data: { visitorId: visitor.id, role: "user", content: message },
    });
  } catch {
    // DB failure is non-fatal — continue to generate reply
  }

  // --- Build system prompt, optionally enriched with visitor context ---
  let systemPrompt = BASE_SYSTEM_PROMPT;
  if (visitor) {
    const ctx = buildVisitorContext(visitor);
    if (ctx) systemPrompt += ctx;
  }

  // --- Generate OpenAI reply ---
  let reply: string;
  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
      ],
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

  // --- Persist: save assistant reply, update visitor identity & notes ---
  if (visitor) {
    try {
      // Save assistant reply
      await prisma.conversationMessage.create({
        data: { visitorId: visitor.id, role: "assistant", content: reply },
      });

      // Extract identity hints from the user's message
      const identity = extractIdentity(message);

      // Update rolling notes/summary
      const topic = inferTopic(message);
      const updatedNotes = buildUpdatedNotes(visitor.notes, topic);

      // Build the identity update — only overwrite if we have something new and field is empty
      const identityUpdate: {
        name?: string;
        email?: string;
        company?: string;
        notes?: string;
      } = {};
      if (identity.name && !visitor.name) identityUpdate.name = identity.name;
      if (identity.email && !visitor.email) identityUpdate.email = identity.email;
      if (identity.company && !visitor.company) identityUpdate.company = identity.company;
      if (updatedNotes !== visitor.notes) identityUpdate.notes = updatedNotes;

      // Also note in visitor.notes if they introduced themselves (for Telegram display)
      if (identity.name || identity.email || identity.company) {
        const who = [identity.name ?? visitor.name, identity.company ?? visitor.company]
          .filter(Boolean)
          .join(" from ");
        if (who) {
          const introLine = `Introduced as: ${who}`;
          const currentNotes = identityUpdate.notes ?? updatedNotes;
          if (!currentNotes.includes("Introduced as:")) {
            identityUpdate.notes = `${currentNotes} | ${introLine}`.replace(/^\s*\|\s*/, "");
          }
        }
      }

      if (Object.keys(identityUpdate).length > 0) {
        visitor = await prisma.visitor.update({
          where: { id: visitor.id },
          data: identityUpdate,
          select: { id: true, name: true, email: true, company: true, notes: true },
        });
      }
    } catch {
      // Persistence failure must not break the reply
    }
  }

  // --- Notify David via Telegram (non-fatal) ---
  try {
    await notifyTelegram(message, reply, visitor ?? { name: null, email: null, company: null, notes: null });
  } catch {
    // Telegram failure must not affect the visitor
  }

  return NextResponse.json({ ok: true, reply });
}
