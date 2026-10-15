export type HeroBannerProps = {
  title: string;
  description?: string;
  imageDesktop: string;
  imageMobile?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};