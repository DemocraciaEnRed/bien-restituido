"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const AssetSerch = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 ">
      <Label htmlFor="search">Buscador de Bienes</Label>
      <Input
        type="search"
        name="search"
        onChange={(e) => console.log(e)}
        placeholder="Buscar bien por (#ID, Juzgado, autos, nº de serie)"
      />
    </div>
  );
};

export default AssetSerch;
