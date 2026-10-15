
import { BlogCard } from "./BlogCard";
import { blogPosts } from "../../mocks/data/blogPosts";

import type { BlogProps } from "../../types/blog.types";

export function Blog({
  posts = blogPosts,
}: BlogProps) {
  return (
    <section
      aria-labelledby="blog-title"
      className="
        mx-auto hidden w-full max-w-300
        flex-col gap-10 lg:flex
      "
    >
      {/* Cabeçalho */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2
          id="blog-title"
          className="
            font-mono text-[28px]
            leading-none font-bold
            text-[#F5F1EB]
          "
        >
          Diário da Cunhagem
        </h2>

        <p
          className="
            font-mono text-sm leading-none
            text-[#CFB28C]
          "
        >
          Histórias, guias e insights para colecionadores
          sobre o universo da propriedade digital.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          flex w-full items-start
          justify-between gap-6
        "
      >
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}
