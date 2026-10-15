
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
      className="
        relative isolate h-[190px] w-full
        overflow-hidden rounded-xl
        bg-[#241612]
        md:h-96 md:rounded-none md:bg-background
      "
    >
      {/* Fundo decorativo do mobile */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-linear-to-br
          from-[#D28A4C]/20
          via-[#65412B]/65
          to-[#241612]
          md:hidden
        "
      />

      {/* Elipses decorativas do Figma */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-[10px] left-[73px]
          size-[248px] rounded-full
          bg-linear-to-br
          from-[#DD9A5F]/37
          to-[#D28A4C]/0
          md:hidden
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-[31px] -left-[80px]
          size-[248px] rounded-full
          bg-linear-to-br
          from-[#DD9A5F]/43
          to-[#D28A4C]/4
          md:hidden
        "
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full items-center p-4 md:p-0">
        <div
          className="
            flex h-full w-[56%] min-w-0
            flex-col justify-start gap-1.5
            md:w-[60%] md:justify-center
            md:gap-0 md:px-10
          "
        >
          {eyebrow && (
            <span
              className="
                font-mono text-xs leading-4
                font-medium text-text-primary
                md:mb-2 md:text-sm
                md:tracking-[0.1em]
              "
            >
              {eyebrow}
            </span>
          )}

          <h1
            className="
              font-mono text-base leading-6
              font-bold text-[#F5F1EB]
              md:max-w-[600px]
              md:text-[43px] md:leading-[70px]
            "
          >
            <span className="md:hidden">
              SEJA DONO DA
              <span className="block">
                CULTURA DIGITAL
              </span>
            </span>

            <span className="hidden md:block">
              {title ===
              "SEJA DONO DO FUTURO DA ARTE DIGITAL" ? (
                <>
                  SEJA DONO DO FUTURO
                  <span className="block">
                    DA ARTE DIGITAL
                  </span>
                </>
              ) : (
                title
              )}
            </span>
          </h1>

          {description && (
            <p
              className="
                max-w-[188px] font-mono
                text-xs leading-[18px]
                text-[#CFB28C]
                md:mt-0 md:max-w-[557px]
                md:text-sm md:leading-6
              "
            >
              <span className="md:hidden">
                Descubra NFTs selecionados de
                criadores do mundo todo.
              </span>

              <span className="hidden md:inline">
                {description}
              </span>
            </p>
          )}

          {buttonText && (
            <button
              type="button"
              onClick={onButtonClick}
              className="
                flex w-fit items-center gap-2
                font-mono text-xs leading-[14px]
                font-bold text-[#E89B55]
                transition-colors
                hover:text-primary-hover
                md:mt-6 md:rounded-md
                md:bg-primary md:px-6 md:py-2
                md:text-background
                md:hover:bg-primary-hover
                md:hover:text-background
              "
            >
              {buttonText}

              <span
                aria-hidden="true"
                className="md:hidden"
              >
                →
              </span>
            </button>
          )}
        </div>

        {/* Imagem principal */}
        <div
          className="
            absolute top-2 right-4
            h-[118px] w-[38%]
            overflow-hidden rounded-xl
            md:top-0 md:right-0
            md:h-full md:w-[35%]
          "
        >
          <picture className="block h-full w-full">
            {imageMobile && (
              <source
                media="(max-width: 767px)"
                srcSet={imageMobile}
              />
            )}

            <img
              src={imageDesktop}
              alt="NFT em destaque"
              className="
                block h-full w-full
                object-cover object-center
              "
            />
          </picture>
        </div>

        {/* NFT secundário mobile */}
        {secondaryImageMobile && (
          <img
            src={secondaryImageMobile}
            alt="NFT secundário"
            className="
              absolute right-[28%] bottom-[24%]
              z-20 size-12
              rounded-lg object-cover
              md:hidden
            "
          />
        )}

        {/* Indicadores */}
        <div
          aria-hidden="true"
          className="
            absolute bottom-2 left-1/2
            z-20 flex -translate-x-1/2
            gap-1.5 md:bottom-8
          "
        >
          <span className="size-1.5 rounded-full bg-primary" />
          <span className="size-1.5 rounded-full bg-primary/70" />
          <span className="size-1.5 rounded-full bg-primary/70" />
        </div>
      </div>
    </section>
  );
}
