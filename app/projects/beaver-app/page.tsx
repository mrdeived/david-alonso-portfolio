import Link from "next/link";

export const metadata = {
  title: "Beaver App — David Alonso",
  description:
    "A full-stack Progressive Web App built to improve student engagement at MSU through campus events, social features, and daily games.",
};

export default function BeaverAppPage() {
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
          Full-Stack · PWA · Analytics
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Beaver App
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-zinc-400">
          Beaver App is a Progressive Web App built for students at Minnesota
          State University Moorhead. It brings together campus events, social
          interactions, and daily engagement games — all designed with user
          behavior tracking at the core, so the data generated is immediately
          useful for analytics and product decisions.
        </p>

        <a
          href="https://msu-life-production.up.railway.app/home"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-14 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          View Live App
        </a>

        <div className="space-y-14">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Overview
            </h2>
            <p className="leading-8 text-zinc-400">
              The goal was straightforward: build something students would
              actually use, and instrument it properly from the start. Most
              campus apps feel like afterthoughts. Beaver App was designed the
              other way around — the event feed, social layer, and daily games
              are all surfaces that generate behavioral data. Likes, bookmarks,
              attendance check-ins, and game completions are all captured and
              stored in a way that makes downstream analytics easy, not painful.
              The app is deployed on Railway and functions as an installable PWA
              so students can add it to their home screen.
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
                Campus event discovery feed with filtering and attendance
                tracking
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Social interactions — likes and bookmarks stored per user for
                behavioral analysis
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Daily games to drive recurring engagement and session frequency
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                PostgreSQL schema designed around KPI tracking — DAU, retention,
                event engagement rates
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                PWA setup so the app is installable with offline-capable
                architecture
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                Full deployment pipeline on Railway
              </li>
            </ul>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technical Approach
            </h2>
            <p className="leading-8 text-zinc-400">
              The frontend is built with Next.js and TypeScript, with Tailwind
              handling the UI. The backend relies on PostgreSQL, with a schema
              structured so that user interaction events are easy to query
              directly — no transformation layer needed to answer basic product
              questions like "which events get the most bookmarks?" or "how many
              users completed the daily game this week?". The data model was
              intentionally kept flat where possible to support straightforward
              SQL queries for dashboarding. Authentication and session management
              are handled server-side, keeping sensitive logic off the client.
            </p>
          </section>

          <hr className="border-zinc-800" />

          <section>
            <h2 className="mb-4 text-xl font-semibold text-zinc-100">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "Tailwind CSS",
                "PWA",
                "Railway",
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
