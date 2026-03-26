import Link from "next/link";

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
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          AI Voice Assistant
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-zinc-400">
          A fully functional AI voice assistant built to take spoken requests and
          actually do something with them — not just respond with text. The
          system handles the entire flow from speech to action: it listens,
          interprets the intent using an LLM, looks up relevant data, and
          executes real-world tasks like placing calls and scheduling meetings.
        </p>

        <div className="space-y-14">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Overview
            </h2>
            <p className="leading-8 text-zinc-400">
              Most voice assistant demos stop at generating a response. This one
              was built to go further — the LLM is just one part of a larger
              decision flow that connects to real APIs and takes real actions.
              The design challenge was making the system feel responsive even
              though multiple services are involved: speech recognition, LLM
              inference, database lookup, and outbound API calls all need to
              happen in sequence without the interaction feeling sluggish. The
              system was demonstrated end-to-end, handling task-oriented requests
              that involve retrieving structured information and executing on it.
            </p>
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
                Automated phone call execution via API integration
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
              LLM calls are kept focused to minimize response time. The overall
              architecture is closer to an automation pipeline than a
              conversational chatbot.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "LLM APIs",
                "Speech Processing",
                "SQL",
                "REST APIs",
                "Calendar API",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
