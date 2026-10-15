
export type FooterBenefit = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterLinkGroup = {
  title: string;
  links: FooterLink[];
};

export type FooterNewsletterProps = {
  onSubscribe?: (email: string) => void | Promise<void>;
};

export type FooterLinksProps = {
  groups: FooterLinkGroup[];
};
