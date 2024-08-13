import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actorType } from "@/lib/utils/constants";
import { Trash } from "lucide-react";

const ThirdPart = ({ values, number, deleteThirdPart, setValues }) => {
  return (
    <div className="bg-slate-200 p-4 rounded-lg mb-3">
      <div className="flex justify-between">
        <h5>Tercero nº {number + 1}</h5>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => deleteThirdPart(number)}
        >
          <Trash className="cursor-pointer" />
        </Button>
      </div>
      <div>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-3">
          tipo de actor <span className="text-red-600">*</span>
        </p>
        <div className="flex gap-1">
          {actorType.map((type) => (
            <div className="my-4" key={type.value}>
              <input
                type="radio"
                name={`third.${number}.type`}
                className="hidden"
                id={`${type.value}${number}`}
                value={type.value}
                required
                onChange={setValues}
                checked={values.type === type.value}
              />
              <label
                htmlFor={`${type.value}${number}`}
                className={`border-2 rounded-md p-3 cursor-pointer border-slate-300   ${
                  values.type === type.value
                    ? "bg-slate-600 text-white"
                    : "text-slate-600 bg-white"
                }`}
              >
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}.lastName`}>
          Apellido<span className="text-red-600">*</span>
        </Label>
        <Input
          onChange={setValues}
          id={`third.${number}.lastName`}
          name={`third.${number}.lastName`}
          type="text"
          value={values.lastName}
          required
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}.name`}>
          Nombre<span className="text-red-600">*</span>
        </Label>
        <Input
          onChange={setValues}
          id={`third.${number}.name`}
          name={`third.${number}.name`}
          type="text"
          value={values.name}
          required
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}.typeId`}>
          Tipo de identificación <span className="text-red-600">*</span>
        </Label>
        <Select
          id={`third.${number}.typeId`}
          name={`third.${number}.typeId`}
          required
          onValueChange={(value) =>
            setValues({
              target: { name: `third.${number}.typeId`, value },
            })
          }
        >
          <SelectTrigger>
            {values.typeId || <SelectValue placeholder="Seleccionar tipo " />}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dni">DNI</SelectItem>
            <SelectItem value="libreta">Libreta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}.numberId`}>
          Numero de identificación<span className="text-red-600">*</span>
        </Label>
        <Input
          onChange={setValues}
          id={`third.${number}.numberId`}
          name={`third.${number}.numberId`}
          type="text"
          value={values.numberId}
          required
        />
      </div>
    </div>
  );
};

export default ThirdPart;
