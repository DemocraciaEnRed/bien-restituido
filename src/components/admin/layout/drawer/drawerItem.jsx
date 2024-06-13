"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DrawerItem({ url, text, icon }) {
  const pathname = usePathname();
  return (
    <li className="flex">
      {pathname.startsWith("/admin" + url) && (
        <span className="p-1 bg-stone-800 rounded-r-md"></span>
      )}
      <Link
        className={`flex items-center p-4 text-gray-700 bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 `}
        href={"/admin" + url}
      >
        {icon}
        <span className="mx-4 font-medium">{text}</span>
      </Link>
    </li>
  );
}

export default DrawerItem;
