"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DrawerItem({ url, text, icon }) {
  const pathname = usePathname();
  return (
    <li className="flex">
      <Link
        className={`py-4 mx-2 pl-4 w-full font-bold flex rounded-lg ${pathname.startsWith("/admin" + url) && "bg-blue-700 text-white shadow-md"}`}
        href={"/admin" + url}
      >
        {icon}
        <span className="mx-4 font-medium">{text}</span>
      </Link>
    </li>
  );
}

export default DrawerItem;
