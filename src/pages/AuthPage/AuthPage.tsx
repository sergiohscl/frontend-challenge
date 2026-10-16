import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { MobileAuth } from "@/components/AuthModal/MobileAuth";

export function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectDesktop = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        void navigate({
          to: "/",
          search: { auth: "login" },
          replace: true,
        });
      }
    };

    redirectDesktop();

    window.addEventListener("resize", redirectDesktop);

    return () => {
      window.removeEventListener("resize", redirectDesktop);
    };
  }, [navigate]);

  return (
    <div className="lg:hidden">
      <MobileAuth />
    </div>
  );
}
