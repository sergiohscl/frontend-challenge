import type { BlogCardProps } from "../../types/blog.types";

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article
      className="
        flex h-92.25 w-67 shrink-0
        flex-col overflow-hidden
        rounded-lg bg-[#241612]
      "
    >
      {/* Imagem */}
      <div className="h-48 w-full shrink-0 overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
        {/* Data e tempo de leitura */}
        <p
          className="
            font-mono text-xs leading-4
            text-[#CFB28C]
          "
        >
          {post.date}
          <span className="mx-2" aria-hidden="true">
            |
          </span>
          Leitura de {post.readingTime}
        </p>

        {/* Título */}
        <h3
          className="
            font-mono text-sm leading-5
            font-bold text-[#F5F1EB]
          "
        >
          {post.title}
        </h3>

        {/* Descrição */}
        <p
          className="
            font-mono text-xs leading-4
            text-[#CFB28C]
          "
        >
          {post.description}
        </p>

        {/* Link */}
        {post.href ? (
          <a
            href={post.href}
            className="
              mt-auto w-fit font-mono
              text-xs font-bold
              text-[#E89B55]
              hover:underline
            "
          >
            Ler mais →
          </a>
        ) : (
          <span
            className="
              mt-auto font-mono
              text-xs font-bold
              text-[#E89B55]
            "
          >
            Ler mais →
          </span>
        )}
      </div>
    </article>
  );
}
