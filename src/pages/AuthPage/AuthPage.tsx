
import { MobileAuth } from "@/components/AuthModal/MobileAuth";
import { AuthModal } from "@/components/AuthModal/AuthModal";
import { useState } from "react";

export function AuthPage() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileAuth />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <AuthModal
          isOpen={isDesktopOpen}
          onClose={() => setIsDesktopOpen(false)}
        />
      </div>
    </>
  );
}
