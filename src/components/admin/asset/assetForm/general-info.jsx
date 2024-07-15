import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React from "react";

function GeneralInfo() {
  return (
    <div>
      <h2 className="text-xl">Titular</h2>
      <div className="grid items-center gap-1.5 px-1">
        <Label className="pt-3" htmlFor="name">
          Nombre del titular
        </Label>
        <Input id="name" type="text" />
        <Label className="pt-3" htmlFor="last-name">
          Apellido del titular
        </Label>
        <Input id="last-name" type="text" />

        <Label className="pt-3" htmlFor="id-type">
          Tipo de identificación
        </Label>
        <Select id="id-type">
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dni">DNI</SelectItem>
            <SelectItem value="Libreta">Libreta</SelectItem>
          </SelectContent>
        </Select>

        <Label className="pt-3" htmlFor="dni">
          Numero de identificación
        </Label>
        <Input id="dni" type="text" />
        <Label className="pt-3" htmlFor="owner-address">
          Dirección
        </Label>
        <Input id="owner-address" type="text" />

        <Separator />

        <Label className="pt-3" htmlFor="asset-address">
          Apellido del titular
        </Label>
        <Input id="asset-address" type="text" />
      </div>
    </div>
  );
}

export default GeneralInfo;
