"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AssetSerch = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("estado") || "todos");
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

  function handleFilter(value) {
    setFilter(value);
    const params = new URLSearchParams(searchParams.entries());

    if (!value) {
      params.delete("estado");
      params.delete("categoria");
    } else {
      const typeFilter = categories.some((category) => category.slug === value)
        ? "categoria"
        : "estado";
      const deleteFilter = !categories.some(
        (category) => category.slug === value
      )
        ? "categoria"
        : "estado";
      params.set(typeFilter, value);
      params.delete("page");
      params.delete(deleteFilter);
    }
    const estado = params.toString();
    const query = estado ? `?${estado}` : "";

    router.push(`${pathname}${query}`);
  }

  return (
    <div className="flex w-full gap-3 md:items-center flex-col md:flex-row">
      <div className="md:w-4/5">
        <Input
          type="search"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar bien por (#ID, Juzgado, autos)"
          className="shadow-md rounded-lg"
        />
      </div>

      <div className="md:w-1/5">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex justify-center text-start">
            <span className="p-2 pl-4 w-full bg-white flex flex-row gap-3 shadow-md rounded-lg">
              <FilterIcon className="text-orange-500" /> Filtrar
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={filter} onValueChange={handleFilter}>
              <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
              {!pathname.startsWith("/admin") && (
                <>
                  <DropdownMenuRadioItem value="subasta">
                    Subasta
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="reutilizacion">
                    Reutilizacion
                  </DropdownMenuRadioItem>
                  <Separator />
                </>
              )}
              {categories &&
                categories.map((category) => (
                  <DropdownMenuRadioItem
                    key={category._id}
                    value={category.slug}
                  >
                    {category.name}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AssetSerch;
