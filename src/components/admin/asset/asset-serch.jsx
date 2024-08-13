"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FilterIcon
} from "lucide-react";

const AssetSerch = () => {
  return (
    <div className="flex flex-row w-full gap-3">
      <div className="w-4/5">
        <Input
          type="search"
          name="search"
          onChange={(e) => console.log(e)}
          placeholder="Buscar bien por (#ID, Juzgado, autos, nº de serie)"
          className="shadow-md rounded-lg"
        />
      </div>
      <div className="w-1/5">
        <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex justify-center text-start">
          <span className="p-2 pl-4 w-full bg-white flex flex-row gap-3 shadow-md rounded-lg"> <FilterIcon color="blue" /> Filtrar</span>
        </DropdownMenuTrigger>        
          <DropdownMenuContent>
            <DropdownMenuItem>
              Supiti
            </DropdownMenuItem>
            <DropdownMenuItem>
              Upiti
            </DropdownMenuItem>
            <DropdownMenuItem>
              Uapiti
            </DropdownMenuItem>          
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
    </div>
  );
};

export default AssetSerch;
