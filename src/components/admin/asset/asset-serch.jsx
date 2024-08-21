"use client";
import React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";

import { getAssetBySearch } from "@/lib/server-actions/admin/asset-actions/asset";

const AssetSerch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (event) => {
    let value = event.target.value.trim();
    const params = new URLSearchParams(searchParams.entries());

    if (!value) {
      params.delete("search");
    } else {
      params.set("search", event.target.value);
    }
    const search = params.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };
  return (
    <div className="flex flex-row w-full gap-3">
      <div className="w-4/5">
        <Input
          type="search"
          name="search"
          value={searchParams.get("search") || ""}
          onChange={handleSearch}
          placeholder="Buscar bien por (#ID, Juzgado, autos, nº de serie)"
          className="shadow-md rounded-lg"
        />
      </div>
      <div className="w-1/5">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex justify-center text-start">
            <span className="p-2 pl-4 w-full bg-white flex flex-row gap-3 shadow-md rounded-lg">
              <FilterIcon color="blue" /> Filtrar
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Supiti</DropdownMenuItem>
            <DropdownMenuItem>Upiti</DropdownMenuItem>
            <DropdownMenuItem>Uapiti</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AssetSerch;
