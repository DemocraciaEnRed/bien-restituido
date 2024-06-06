import Drawer from "@/app/admin/_components/drawer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Drawer />
      <div className="container min-h-[calc(100vh_-_theme(height.nav))]">
        {children}
      </div>
    </div>
  );
}
