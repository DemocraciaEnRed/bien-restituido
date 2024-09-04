"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";

const AssetSerch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    handleSearch(searchValue);
  }, [debouncedTerm]);

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams.entries());

    if (!value) {
      params.delete("search");
    } else {
      params.set("search", value);
      params.delete("page");
    }
    const search = params.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };
  return (
    <div className="flex flex-row w-full gap-3">
      <div className="w-4/5">
        <Input
          type="search"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
