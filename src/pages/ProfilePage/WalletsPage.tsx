import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { ProfileSidebar } from "@/components/Profile/ProfileSidebar";
import { WalletsForm } from "@/components/Profile/WalletsForm";

export function WalletsPage() {
  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F1EB]">
      <DesktopHeader />

      <main className="mx-auto grid w-full max-w-300 grid-cols-1 items-start gap-7 px-4 pt-8 pb-20 lg:grid-cols-[310px_minmax(0,1fr)] lg:px-0">
        <ProfileSidebar />

        <WalletsForm />
      </main>
    </div>
  );
}
