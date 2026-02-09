import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 shrink-0">
        <AdminSidebar className="fixed inset-y-0 left-0 z-10 w-64" />
      </div>

      {/* Conteudo Principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminNavbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
