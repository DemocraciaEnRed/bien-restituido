import { useEffect, useState } from "react";

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
import {
  getLocation,
  getProvinces,
} from "@/lib/server-actions/admin/asset-actions/location";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const JudicialInfo = ({ setJudicialData }) => {
  const [data, setData] = useState(null);

  const handleChangeInput = (event) => {
    if (data) {
      data[event.target.name] = event.target.value;
      setData({ ...data });
    } else {
      const inputData = {
        [event.target.name]: event.target.value,
      };
      setData(inputData);
    }
    setJudicialData(data);
  };

  return (
    <div>
      <h2 className="text-xl">Cautela</h2>
      <div className="grid items-center gap-1.5 px-1">
        <Label className="pt-3" htmlFor="cautetaDate">
          Fecha de cautela
        </Label>
        <Input
          id="cautetaDate"
          type="date"
          name="cautetaDate"
          onChange={handleChangeInput}
        />
        <Label className="pt-3" htmlFor="cautelaResolution">
          Resolución de cautela
        </Label>
        <Input
          id="cautelaResolution"
          name="cautelaResolution"
          type="file"
          onChange={handleChangeInput}
        />
        <Separator className="w-1/2 my-3 h-1 mx-auto" />

        <h2 className="text-xl">Decomiso</h2>
        <div className="flex items-center space-x-2 pt-3 ">
          <Checkbox
            name="confiscated"
            id="confiscated"
            onCheckedChange={(value) =>
              handleChangeInput({
                target: { name: "confiscated", value },
              })
            }
          />
          <Label className="" htmlFor="confiscated">
            ¿El bien fue decomisado?
          </Label>
        </div>

        <Label className="pt-3" htmlFor="confiscatedDate">
          Fecha de decomiso
        </Label>
        <Input
          id="confiscatedDate"
          name="confiscatedDate"
          type="date"
          onChange={handleChangeInput}
        />
        <Label className="pt-3" htmlFor="confiscatedResolution">
          Resolución de decomiso
        </Label>
        <Input
          id="confiscatedResolution"
          type="file"
          name="confiscatedResolution"
          onChange={handleChangeInput}
        />

        <Separator className="w-1/2 my-3 h-1 mx-auto" />
        <h2 className="text-xl">Proceso judicial</h2>

        <Label className="pt-3" htmlFor="Juzgado">
          Juzgado
        </Label>
        <Select
          name="Juzgado"
          id="Juzgado"
          onValueChange={(value) =>
            handleChangeInput({ target: { name: "Juzgado", value } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar provincia " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>

        <Label className="pt-3" htmlFor="fiscalia">
          Fiscalia
        </Label>
        <Select
          name="fiscalia"
          id="fiscalia"
          onValueChange={(value) =>
            handleChangeInput({ target: { name: "fiscalia", value } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar provincia " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>

        <Label className="pt-3" htmlFor="tribunal">
          Tribunal
        </Label>
        <Select
          name="tribunal"
          id="tribunal"
          onValueChange={(value) =>
            handleChangeInput({ target: { name: "tribunal", value } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar provincia " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>

        <Label className="pt-3" htmlFor="causeNumber">
          Numero de la causa
        </Label>
        <Input
          id="cause-number"
          name="cause-number"
          type="text"
          onChange={handleChangeInput}
        />

        <Label className="pt-3" htmlFor="causeCoverSheet">
          Autos de la causa
        </Label>
        <Input
          id="causeCoverSheet"
          name="causeCoverSheet"
          type="text"
          onChange={handleChangeInput}
        />
        <div className="flex items-center space-x-2 pt-3">
          <Checkbox
            name="thirdParties"
            id="thirdParties"
            onCheckedChange={(value) =>
              handleChangeInput({ target: { name: "thirdParties", value } })
            }
          />
          <Label className="" htmlFor="thirdParties">
            ¿Hay terceros involucrados?
          </Label>
        </div>
      </div>
    </div>
  );
};

export default JudicialInfo;
