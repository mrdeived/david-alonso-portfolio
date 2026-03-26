import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  stack: string[];
  externalHref?: string;
  githubHref?: string;
  detailsHref: string;
};

export default function ProjectCard({
  title,
  description,
  stack,
  externalHref,
  githubHref,
  detailsHref,
}: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {externalHref && (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500"
          >
            Live App
          </a>
        )}
        {githubHref && (
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-700 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            GitHub
          </a>
        )}
        <Link
          href={detailsHref}
          className="rounded-lg border border-zinc-700 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
