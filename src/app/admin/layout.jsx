import Drawer from "@/components/admin/layout/drawer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex pt-[theme(height.nav)]">
      <Drawer />
      <div className="container py-8 min-h-[calc(100vh_-_theme(height.nav))]">
        {children}
      </div>
    </div>
  );
}
