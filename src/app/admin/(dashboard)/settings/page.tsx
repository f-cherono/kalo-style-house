import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getCurrentAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide">SETTINGS</h1>
      <div className="mt-8">
        <h2 className="font-display text-lg tracking-wide">CHANGE PASSWORD</h2>
        <div className="mt-4">
          <ChangePasswordForm email={session.email} />
        </div>
      </div>
    </div>
  );
}
