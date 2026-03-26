type ProjectCardProps = {
  title: string;
  description: string;
  stack: string[];
  href?: string | null;
};

export default function ProjectCard({ title, description, stack, href }: ProjectCardProps) {
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
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-fit text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on GitHub →
        </a>
      )}
    </article>
  );
}
