type HeroBannerProps = {
  title: string;
  description?: string;
  imageDesktop: string;
  imageMobile?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export function HeroBanner({
  title,
  description,
  imageDesktop,
  imageMobile,
  buttonText,
  onButtonClick,
}: HeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl">
      <picture>
        {imageMobile && (
          <source media="(max-width: 767px)" srcSet={imageMobile} />
        )}

        <img src={imageDesktop} alt="" className="h-full w-full object-cover" />
      </picture>

      <div className="absolute inset-0 flex flex-col justify-center bg-black/40 p-6 md:p-12">
        <h1 className="max-w-xl text-3xl font-bold text-white md:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-lg text-sm text-white/90 md:text-lg">
            {description}
          </p>
        )}
        {buttonText && (
          <button
            type="button"
            onClick={onButtonClick}
            className="mt-6 w-fit rounded-lg bg-(--hero-button-bg) px-6 py-3 font-semibold text-(--hero-button-text) transition-colors hover:bg-[#F4B477]"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
