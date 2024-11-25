import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/ui/select-custom";
import { Trash } from "lucide-react";
import React from "react";

const TitularForm = ({ values, number, deleteTitular, setValues }) => {
  return (
    <div className="border rounded-md  mt-3 p-2">
      <div className="flex justify-between">
        <h2 className="text-xl">Titular</h2>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => deleteTitular(number)}
        >
          <Trash className="cursor-pointer" />
        </Button>
      </div>
      <div>
        <Label className="pt-3" htmlFor={`owner.${number}.Name`}>
          Nombre del titular <span className="text-red-600">*</span>
        </Label>
        <Input
          id={`owner.${number}.Name`}
          type="text"
          name={`owner.${number}.Name`}
          required
          defaultValue={values && values.Name}
          onChange={setValues}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`owner.${number}.LastName`}>
          Apellido del titular <span className="text-red-600">*</span>
        </Label>
        <Input
          id={`owner.${number}.LastName`}
          name={`owner.${number}.LastName`}
          type="text"
          required
          defaultValue={values && values.LastName}
          onChange={setValues}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`owner.${number}.IdType`}>
          Tipo de identificación <span className="text-red-600">*</span>
        </Label>
        <SelectCustom
          name={`owner.${number}.IdType`}
          id={`owner.${number}.IdType`}
          required
          defaultValue={(values && values.IdType) || ""}
          onChange={setValues}
        >
          <option value="" disabled>
            Seleccionar tipo
          </option>
          <option value="dni">DNI</option>
          <option value="libreta">libreta</option>
        </SelectCustom>
      </div>
      <div>
        <Label className="pt-3" htmlFor={`owner.${number}.NumberId`}>
          Numero de identificación <span className="text-red-600">*</span>
        </Label>
        <Input
          id={`owner.${number}.NumberId`}
          name={`owner.${number}.NumberId`}
          type="text"
          required
          defaultValue={values && values.NumberId}
          onChange={setValues}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`owner.${number}.Address`}>
          Dirección <span className="text-red-600">*</span>
        </Label>
        <Input
          id={`owner.${number}.Address`}
          type="text"
          name={`owner.${number}.Address`}
          required
          defaultValue={values && values.Address}
          onChange={setValues}
        />
      </div>
    </div>
  );
};

export default TitularForm;
