import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import type { FooterLinksProps } from "../../types/footer.types";

const socialNetworks = [
  { label: "Facebook", Icon: FaFacebookF },
  { label: "Instagram", Icon: FaInstagram },
  { label: "Twitter", Icon: FaTwitter },
  { label: "LinkedIn", Icon: FaLinkedinIn },
  { label: "YouTube", Icon: FaYoutube },
];

export function FooterLinks({ groups }: FooterLinksProps) {
  return (
    <div
     className="
        grid h-59 grid-cols-4
        gap-8 bg-surface-card
        px-8 py-8
    "
    >
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <h3 className="font-mono text-base font-bold text-[#F5F1EB]">
            {group.title}
          </h3>

          <ul className="flex flex-col gap-2">
            {group.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="
                      font-mono text-xs
                      text-[#F5F1EB]
                      hover:text-[#E89B55]
                    "
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="font-mono text-xs text-[#F5F1EB]">
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Redes sociais e carteiras */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-base font-bold text-[#F5F1EB]">
            Redes sociais
          </h3>

          <div className="flex items-center gap-2">
            {socialNetworks.map(({ label, Icon }) => (
              <span
                key={label}
                role="img"
                aria-label={label}
                title={label}
                className="
                  flex size-7 items-center
                  justify-center rounded
                  border border-[#D28A4C]
                  text-[#D28A4C]
                "
              >
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        {/* Carteiras compatíveis */}
        <div className="flex flex-col gap-2">
          <h3 className="font-mono text-base font-bold text-[#F5F1EB]">
            Carteiras compatíveis
          </h3>

          <span
            className="
              w-fit rounded border
              border-[#6B421F]
              bg-[#35200F] px-2 py-1
              font-mono text-[9px]
              font-bold text-[#D28A4C]
            "
          >
            METAMASK · WALLETCONNECT · COINBASE
          </span>
        </div>
      </div>
    </div>
  );
}
