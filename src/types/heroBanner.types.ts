export type HeroBannerProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  imageDesktop: string;
  imageMobile?: string;
  secondaryImageMobile?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};
