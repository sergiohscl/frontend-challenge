
import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { ProfileSidebar } from "@/components/Profile/ProfileSidebar";
import { CollectorProfileForm } from "@/components/Profile/CollectorProfileForm";

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      <DesktopHeader />

      <main className="mx-auto grid w-full max-w-300 grid-cols-[310px_minmax(0,1fr)] items-start gap-7 px-0 pt-8 pb-20">
        <ProfileSidebar />

        <CollectorProfileForm />
      </main>
    </div>
  );
}
