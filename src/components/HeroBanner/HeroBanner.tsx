
import type { HeroBannerProps } from "../../types/heroBanner.types";

export function HeroBanner({
  title,
  description,
  eyebrow,
  imageDesktop,
  imageMobile,
  secondaryImageMobile,
  buttonText,
  onButtonClick,
}: HeroBannerProps) {
  return (
    <section
      aria-label="Destaque principal"
      className="relative isolate h-47.5 w-full overflow-hidden rounded-xl bg-surface md:h-96 md:rounded-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#65412B] via-[#392417] to-surface md:from-background md:to-background" />

      <div className="relative z-10 flex h-full items-center p-4 md:p-0">
        <div className="flex h-full w-[62%] flex-col justify-center md:w-[60%] md:px-10">
          {eyebrow && (
            <span className="mb-2 font-mono text-[10px] tracking-wide text-text-primary md:mb-5 md:text-xs">
              {eyebrow}
            </span>
          )}

          <h1 className="font-mono text-base leading-snug font-bold text-text-primary md:text-4xl md:leading-relaxed">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-lg font-mono text-[10px] leading-snug text-text-muted md:mt-3 md:text-sm md:leading-relaxed">
              {description}
            </p>
          )}

          {buttonText && (
            <button
              type="button"
              onClick={onButtonClick}
              className="mt-2 w-fit font-mono text-xs font-semibold text-primary transition-colors hover:text-primary-hover md:mt-6 md:rounded-md md:bg-primary md:px-6 md:py-2 md:text-background md:hover:bg-primary-hover md:hover:text-background"
            >
              {buttonText}
              <span className="ml-2 md:hidden" aria-hidden="true">
                →
              </span>
            </button>
          )}
        </div>

        <div className="absolute top-2 right-3 h-[65%] w-[38%] overflow-hidden rounded-xl md:top-0 md:right-0 md:h-full md:w-[35%]">
          <picture>
            {imageMobile && (
              <source
                media="(max-width: 767px)"
                srcSet={imageMobile}
              />
            )}

            <img
              src={imageDesktop}
              alt="NFT em destaque"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>

        {secondaryImageMobile && (
          <img
            src={secondaryImageMobile}
            alt="NFT secundário"
            className="absolute right-[28%] bottom-[20%] z-20 h-12 w-12 rounded-lg object-cover md:hidden"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 md:bottom-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
        </div>
      </div>
    </section>
  );
}
