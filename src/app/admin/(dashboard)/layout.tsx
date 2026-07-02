import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <AdminSidebar />
      <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
