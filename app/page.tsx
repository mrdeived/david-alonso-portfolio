import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Beaver App",
    description:
      "A full-stack Progressive Web App designed to improve student engagement through campus events, social features, and daily games. Tracks user interactions and structures data for analytics and KPI monitoring.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "PWA"],
    imageSrc: "/projects/beaver-app.png",
    externalHref: "https://msu-life-production.up.railway.app/home",
    githubHref: "https://github.com/mrdeived/msu-life",
    detailsHref: "/projects/beaver-app",
  },
  {
    title: "Predictive Anomaly Detection in Multivariate Oil Well Sensor Data",
    description:
      "Early anomaly detection model identifying abnormal patterns in operational data. Applied preprocessing, windowing, and feature-level analysis to support analytical interpretation of operational risk signals.",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy"],
    imageSrc: "/projects/anomaly-detection.png",
    detailsHref: "/projects/anomaly-detection",
  },
  {
    title: "AI Voice Assistant",
    description:
      "End-to-end AI voice assistant interpreting spoken requests, retrieving structured information, and executing actions through real-time API integrations. Combines speech processing, LLM interpretation, SQL lookup, and calendar scheduling.",
    stack: ["Python", "LLM APIs", "SQL", "Speech Processing"],
    imageSrc: "/projects/VoiceAssistant.png",
    githubHref: "https://github.com/mrdeived/project-jarvis",
    detailsHref: "/projects/ai-voice-assistant",
  },
];

const skills = [
  "SQL",
  "Python",
  "Power BI",
  "PostgreSQL",
  "Data Analysis",
  "Data Visualization",
  "Dashboarding",
  "Product Analytics",
  "Next.js",
  "TypeScript",
];

const coursework = [
  "Programming for Data Science",
  "Data Analytics & Visualization",
  "Machine Learning and AI",
  "Database Management",
  "Systems Analysis",
  "Probability and Statistics I",
  "Probability and Statistics II",
  "Algorithms & Data Structures I",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-24 pt-28"
        >
          <div className="mb-4">
            <Image
              src="/profile.png"
              alt="David Alonso"
              width={260}
              height={260}
              className="drop-shadow-2xl"
              priority
            />
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Data Science · Analytics · Product
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-6xl">
            David Alonso
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            Data Science student at Minot State University. I build products
            that capture real user behavior and use that data to support
            better decisions — across the full stack, from SQL and Python to
            dashboards and deployed applications.
          </p>
          {/* Social links */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/david-alonsog/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a
              href="https://github.com/mrdeived"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              Contact
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* About */}
        <section id="about" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            About
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-300">
            I am a Data Science student at Minot State University in Minot,
            North Dakota, with a minor in Computer Science. My work sits at the
            intersection of software and analytics — I build products that
            capture user behavior, then use that data to answer meaningful
            questions. Whether it is a full-stack web app, a machine learning
            pipeline, or a Power BI dashboard, I care about making data useful
            and decisions clearer.
          </p>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Education */}
        <section id="education" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Education
          </h2>
          <div className="flex flex-col gap-6">
            {/* Minot State */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-zinc-100">
                  Minot State University
                </h3>
                <span className="text-xs text-zinc-500">Minot, North Dakota</span>
              </div>
              <p className="text-sm text-zinc-300">
                B.S. in Data Science — Minor in Computer Science
              </p>
            </div>
            {/* Universidad Americana */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-zinc-100">
                  Universidad Americana
                </h3>
                <span className="text-xs text-zinc-500">Asunción, Paraguay</span>
              </div>
              <p className="text-sm text-zinc-300">
                Bachelor&apos;s Degree in Industrial Engineering
              </p>
            </div>
          </div>

        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Projects
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Skills & Coursework — two-column layout */}
        <section id="skills" className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid gap-12 sm:grid-cols-2">
            {/* Left: Skills */}
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Skills
              </h2>
              <ul className="flex flex-col gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="text-zinc-600">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: Relevant Coursework */}
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Relevant Coursework
              </h2>
              <ul className="flex flex-col gap-2">
                {coursework.map((course) => (
                  <li
                    key={course}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="text-zinc-600">•</span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Contact
          </h2>
          <p className="mb-8 max-w-lg text-base leading-8 text-zinc-300">
            I am open to data analyst, BI, and product analytics roles as well
            as internship opportunities. If you want to talk about data, a
            project, or a potential collaboration — reach out.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">Email</span>
              <a
                href="mailto:davidalonsog97@gmail.com"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                davidalonsog97@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">University</span>
              <a
                href="mailto:david.alonso@ndus.edu"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                david.alonso@ndus.edu
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">Phone</span>
              <a
                href="tel:+17017217224"
                className="font-medium text-zinc-300 transition-colors hover:text-zinc-100"
              >
                +1 701 721 7224
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">Location</span>
              <span className="text-zinc-300">Minot, North Dakota</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/david-alonsog/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                linkedin.com/in/david-alonsog
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-zinc-500">GitHub</span>
              <a
                href="https://github.com/mrdeived"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                github.com/mrdeived
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-zinc-600">
          © {new Date().getFullYear()} David Alonso
        </div>
      </footer>
    </div>
  );
}
