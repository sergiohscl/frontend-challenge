import type { HeroBannerProps } from "../../types/heroBanner.types";

export function HeroBanner({
  title,
  description,
  imageDesktop,
  imageMobile,
  buttonText,
  onButtonClick,
}: HeroBannerProps) {
  return (
    <section
      aria-label="Destaque principal"
      className="relative isolate w-full overflow-hidden rounded-3xl bg-surface"
    >
      {/* Imagem responsiva */}
      <picture className="absolute inset-0 -z-10">
        {imageMobile && (
          <source
            media="(max-width: 767px)"
            srcSet={imageMobile}
          />
        )}

        <img
          src={imageDesktop}
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-background/75 via-background/35 to-transparent" />

      {/* Conteúdo */}
      <div className="flex min-h-44 flex-col justify-center px-4 py-5 sm:min-h-56 sm:px-6 md:min-h-80 md:px-12">
        <div className="max-w-[65%] md:max-w-xl">
          <h1 className="text-lg leading-tight font-bold text-text-primary sm:text-2xl md:text-4xl lg:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 text-xs leading-relaxed text-text-primary/85 sm:text-sm md:mt-4 md:text-base">
              {description}
            </p>
          )}

          {buttonText && (
            <button
              type="button"
              onClick={onButtonClick}
              className="mt-4 w-fit rounded-md bg-primary px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-primary-hover md:mt-6 md:px-6 md:py-3 md:text-sm"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
