import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Beaver App",
    description:
      "A full-stack Progressive Web App designed to improve student engagement through campus events, social features, and daily games. Tracks user interactions and structures data for analytics and KPI monitoring.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "PWA"],
    externalHref: "https://msu-life-production.up.railway.app/home",
    detailsHref: "/projects/beaver-app",
  },
  {
    title: "Predictive Anomaly Detection in Multivariate Oil Well Sensor Data",
    description:
      "Early anomaly detection model identifying abnormal patterns in operational data. Applied preprocessing, windowing, and feature-level analysis to support analytical interpretation of operational risk signals.",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy"],
    detailsHref: "/projects/anomaly-detection",
  },
  {
    title: "AI Voice Assistant",
    description:
      "End-to-end AI voice assistant interpreting spoken requests, retrieving structured information, and executing actions through real-time API integrations. Combines speech processing, LLM interpretation, SQL lookup, and calendar scheduling.",
    stack: ["Python", "LLM APIs", "SQL", "Speech Processing"],
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

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-wide text-zinc-100">
            David Alonso
          </span>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#about" className="hover:text-zinc-100 transition-colors">About</a>
            <a href="#projects" className="hover:text-zinc-100 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-zinc-100 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-zinc-100 transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-24 pt-28"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Data Science · Analytics · Product
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-6xl">
            David Alonso
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            Data Science student building analytics-focused products and
            data-driven tools. I work across the full stack — from SQL queries
            and Python models to interactive dashboards and user behavior
            analysis.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
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
        <section
          id="about"
          className="mx-auto max-w-4xl px-6 py-20"
        >
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            About
          </h2>
          <p className="max-w-2xl text-base leading-8 text-zinc-300">
            I am a Data Science student at Minnesota State University Moorhead,
            focused on building things that generate real insight. My work sits
            at the intersection of software and analytics — I build products
            that capture user behavior, then use that data to answer meaningful
            questions. Whether it is a full-stack web app, a regression model,
            or a Power BI dashboard, I care about making data useful and
            decisions clearer.
          </p>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Projects */}
        <section
          id="projects"
          className="mx-auto max-w-4xl px-6 py-20"
        >
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

        {/* Skills */}
        <section
          id="skills"
          className="mx-auto max-w-4xl px-6 py-20"
        >
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <hr className="border-zinc-800" />
        </div>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto max-w-4xl px-6 py-20"
        >
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Contact
          </h2>
          <p className="mb-5 max-w-lg text-base leading-8 text-zinc-300">
            I am open to data analyst, BI, and product analytics roles as well
            as internship opportunities. If you want to talk about data, a
            project, or a potential collaboration — reach out.
          </p>
          <a
            href="mailto:david.alonso@ndus.edu"
            className="text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            david.alonso@ndus.edu
          </a>
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
