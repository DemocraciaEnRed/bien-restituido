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
    console.log(event);
    setJudicialData(data);
  };

  return (
    <div>
      <h2 className="text-xl">Cautela</h2>
      <div className="grid items-center gap-1.5 px-1">
        <Label className="pt-3" htmlFor="cautela-date">
          Fecha de cautela
        </Label>
        <Input
          id="cautela-date"
          type="date"
          name="cautela-date"
          onChange={handleChangeInput}
        />
        <Label className="pt-3" htmlFor="cautela-resolution">
          Resolución de cautela
        </Label>
        <Input
          id="cautela-resolution"
          name="cautela-resolution"
          type="file"
          onChange={handleChangeInput}
        />
        <Separator className="w-1/2 my-3 h-1 mx-auto" />

        <h2 className="text-xl">Decomiso</h2>
        <div className="flex items-center space-x-2 pt-3 ">
          <Checkbox
            name="asset-confiscated"
            id="asset-confiscated"
            onCheckedChange={(value) =>
              handleChangeInput({
                target: { name: "asset-confiscated", value },
              })
            }
          />
          <Label className="" htmlFor="asset-confiscated">
            ¿El bien fue decomisado?
          </Label>
        </div>

        <Label className="pt-3" htmlFor="confiscated-date">
          Fecha de decomiso
        </Label>
        <Input
          id="confiscated-date"
          name="confiscated-date"
          type="date"
          onChange={handleChangeInput}
        />
        <Label className="pt-3" htmlFor="confiscated-resolution">
          Resolución de decomiso
        </Label>
        <Input
          id="confiscated-resolution"
          type="file"
          name="confiscated-resolution"
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

        <Label className="pt-3" htmlFor="cause-number">
          Dirección
        </Label>
        <Input
          id="cause-number"
          name="cause-number"
          type="text"
          onChange={handleChangeInput}
        />

        <Label className="pt-3" htmlFor="cause-car">
          Dirección
        </Label>
        <Input
          id="cause-car"
          name="cause-car"
          type="text"
          onChange={handleChangeInput}
        />
        <div className="flex items-center space-x-2 pt-3">
          <Checkbox
            name="third-parties"
            id="third-parties"
            onCheckedChange={(value) =>
              handleChangeInput({ target: { name: "third-parties", value } })
            }
          />
          <Label className="" htmlFor="third-parties">
            ¿Hay terceros involucrados?
          </Label>
        </div>
      </div>
    </div>
  );
};

export default JudicialInfo;
