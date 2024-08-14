"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Box,
  ChevronDown,
  Check,
  Gavel,
  Repeat,
  FolderOpen,
} from "lucide-react";

const bienesDrawerList = [
  { url: "/admin/bien", icon: <Check />, text: "Todos" },
  { url: "/admin/bien/subasta", icon: <Gavel />, text: "Subasta" },
  { url: "/admin/bien/reutilizacion", icon: <Repeat />, text: "Reutilización" },
  { url: "/admin/bien/archivados", icon: <FolderOpen />, text: "Archivados" },
];






function BienesDrawerItem() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)
  const currentSelection = bienesDrawerList.find(item => item.url === pathname)
  return (
    <li className="flex">
      <DropdownMenu open={open}>
        <DropdownMenuTrigger
          className="w-full flex justify-center items-center"
          onClick={() => setOpen((x) => !x)}
        >
          <span
            className={`py-4 m-2 pl-4 w-full font-bold flex gap-3 rounded-lg ${
              pathname.startsWith("/admin/bien") &&
              "bg-blue-700 text-white shadow-md"
            }`}
          >
            {currentSelection ? currentSelection.icon : <Box />}
            {currentSelection ? currentSelection.text : "Bienes"}
            <ChevronDown className="r-0 mx-auto" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-full"
          onClick={() => setOpen(false)}
          onInteractOutside={() => setOpen(false)}
        >
          {bienesDrawerList.map((item) => (
            <DropdownMenuItem key={item.url}>
              <Link className="flex items-center px-4" href={item.url}>
                {item.icon}
                <span className="mx-4 font-medium">{item.text}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

export default BienesDrawerItem;
