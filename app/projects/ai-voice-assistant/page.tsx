import Image from "next/image";
import Link from "next/link";
import { GitFork } from "lucide-react";

export const metadata = {
  title: "AI Voice Assistant — David Alonso",
  description:
    "An end-to-end AI voice assistant combining speech processing, LLM interpretation, SQL contact lookup, automated phone calls, and calendar scheduling.",
};

export default function AIVoiceAssistantPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          ← Back to home
        </Link>

        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400">
          AI · Automation · Real-Time Systems
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          AI Voice Assistant
        </h1>

        <p className="mb-6 text-sm font-medium text-amber-400">
          2nd Place — Minot State University Academic Showcase 2025
        </p>

        <p className="mb-8 text-lg leading-relaxed text-zinc-400">
          A fully functional AI voice assistant built to take spoken requests and
          actually do something with them — not just respond with text. The
          system handles the entire flow from speech to action: it listens,
          interprets the intent using an LLM, looks up relevant data, and
          executes real-world tasks like placing calls and scheduling meetings.
        </p>

        <figure className="mb-8 overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src="/projects/VoiceAssistant.png"
            alt="AI Voice Assistant project hero"
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </figure>

        <div className="mb-14 flex flex-wrap gap-3">
          <a
            href="https://github.com/mrdeived/project-jarvis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            <GitFork size={16} />
            View on GitHub
          </a>
        </div>

        <div className="space-y-14">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Overview
            </h2>
            <p className="leading-8 text-zinc-400">
              An end-to-end AI voice assistant designed to interpret natural
              language requests and execute real-world actions. Unlike
              traditional voice assistants based on predefined commands, this
              system uses intelligent agents to understand intent, manage
              conversations, and automate tasks such as phone calls and calendar
              scheduling.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-6 text-xl font-semibold text-zinc-100">
              System Architecture
            </h2>
            <figure className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src="/projects/voice-assistant-architecture.png"
                alt="AI Voice Assistant system architecture diagram"
                width={1200}
                height={800}
                className="w-full object-contain"
              />
            </figure>
            <p className="mb-4 leading-8 text-zinc-400">
              The system is built as a multi-agent loop where each component
              handles a specific responsibility:
            </p>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Wake word detection activates the system
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Speech-to-text captures user input
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Intent interpretation extracts meaning using LLMs
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Execution agents perform actions such as making calls
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Conversation agent manages dynamic dialogue
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Calendar agent schedules events
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                System returns to passive listening after each task
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              What I Built
            </h2>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Speech-to-text pipeline that captures and transcribes spoken
                requests in real time
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                LLM-based intent interpretation that parses natural language into
                structured action instructions
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                SQL-backed contact lookup so the assistant can resolve names and
                retrieve contact details on demand
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Automated phone call execution via Twilio API integration
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Calendar scheduling integration to book and manage events through
                spoken commands
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Orchestration layer that routes parsed intent to the appropriate
                action handler
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technical Approach
            </h2>
            <p className="leading-8 text-zinc-400">
              The system is built in Python with each component cleanly
              separated: speech processing, LLM calls, database access, and
              outbound API calls are all independent modules tied together by an
              orchestration layer. The LLM receives the transcribed text and
              returns a structured response indicating what action to take and
              what parameters to use — it is not generating freeform prose, it is
              making routing decisions. That structured output is what allows the
              system to be deterministic: once the intent is parsed, the rest of
              the flow is just function calls. Latency was a design constraint
              throughout — speech recognition runs locally where possible, and
              LLM calls are kept focused to minimize response time.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-6 text-xl font-semibold text-zinc-100">
              Technologies
            </h2>
            <figure className="mb-6 overflow-hidden rounded-xl border border-zinc-800">
              <Image
                src="/projects/voice-assistant-tech.png"
                alt="Technologies used in the AI Voice Assistant"
                width={1200}
                height={800}
                className="w-full object-contain"
              />
            </figure>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                OpenAI (via LiteLLM)
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Google Cloud (STT, TTS, Calendar)
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Twilio (voice calls)
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Porcupine (wake word detection)
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Python backend
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                ngrok (local-to-public bridge)
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Challenges &amp; Learnings
            </h2>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Managing real-time coordination between multiple agents
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Handling conversation memory and multi-step interactions
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Integrating external APIs (Twilio, Google Calendar) reliably
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Designing a system that reacts dynamically instead of following
                fixed command flows
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
