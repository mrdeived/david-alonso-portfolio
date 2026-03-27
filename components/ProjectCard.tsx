import Link from "next/link";
import Image from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  stack: string[];
  imageSrc?: string;
  externalHref?: string;
  githubHref?: string;
  detailsHref: string;
};

export default function ProjectCard({
  title,
  description,
  imageSrc,
  externalHref,
  githubHref,
  detailsHref,
}: ProjectCardProps) {
  const githubIsPrimary = !externalHref && !!githubHref;

  return (
    <article className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden transition-colors hover:border-zinc-700">
      {imageSrc && (
        <div className="relative w-full aspect-video border-b border-zinc-800">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
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
              className={
                githubIsPrimary
                  ? "rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-500"
                  : "rounded-lg border border-zinc-700 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
              }
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
      </div>
    </article>
  );
}
