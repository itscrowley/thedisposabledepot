import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
