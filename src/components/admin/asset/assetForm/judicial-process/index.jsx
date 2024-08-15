import React, { useState } from "react";

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

import { Checkbox } from "@/components/ui/checkbox";
import ThirdPartForm from "./third-parties-form";
import { formatDate } from "@/lib/utils";
import SelectCustom from "@/components/ui/select-custom";

const JudicialInfo = ({ assetEdit }) => {
  const [data, setData] = useState(assetEdit || null);

  const handleChangeInput = (event) => {
    if (data) {
      data[event.target.name] =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      setData({ ...data });
    } else {
      const inputData = {
        [event.target.name]:
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      };
      setData(inputData);
    }
  };

  return (
    <div className="grid items-center gap-1.5 px-1">
      <h2 className="text-xl">Cautela</h2>
      <div>
        <Label className="pt-3" htmlFor="cautelaDate">
          Fecha de cautela<span className="text-red-600">*</span>
        </Label>
        <Input
          id="cautelaDate"
          type="date"
          required
          defaultValue={assetEdit && formatDate(assetEdit.cautelaDate)}
          className="block"
          name="cautelaDate"
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor="cautelaResolution">
          Resolución de cautela<span className="text-red-600">*</span>
        </Label>
        <Input
          id="cautelaResolution"
          name="cautelaResolution"
          type="file"
          required
          onChange={handleChangeInput}
        />
      </div>
      <Separator className="w-1/2 my-3 h-1 mx-auto" />

      <h2 className="text-xl">Decomiso</h2>
      <div className="flex items-center space-x-2 pt-3 ">
        <Checkbox
          name="confiscated"
          id="confiscated"
          checked={data?.confiscated}
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
      {data && data["confiscated"] && (
        <>
          <div>
            <Label className="pt-3" htmlFor="confiscatedDate">
              Fecha de decomiso<span className="text-red-600">*</span>
            </Label>
            <Input
              id="confiscatedDate"
              name="confiscatedDate"
              type="date"
              className="block"
              required
              defaultValue={assetEdit && formatDate(assetEdit.confiscatedDate)}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Label className="pt-3" htmlFor="confiscatedResolution">
              Resolución de decomiso<span className="text-red-600">*</span>
            </Label>
            <Input
              id="confiscatedResolution"
              type="file"
              required
              name="confiscatedResolution"
              onChange={handleChangeInput}
            />
          </div>
        </>
      )}

      <Separator className="w-1/2 my-3 h-1 mx-auto" />
      <h2 className="text-xl">Proceso judicial</h2>
      <div>
        <Label className="pt-3" htmlFor="juzgado">
          Juzgado <span className="text-red-600">*</span>
        </Label>
        <SelectCustom
          name="juzgado"
          id="juzgado"
          required
          defaultValue={(assetEdit && assetEdit.juzgado) || ""}
          onChange={handleChangeInput}
        >
          <option value="" disabled>
            Seleccioná juzgado
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectCustom>
      </div>
      <div>
        <Label className="pt-3" htmlFor="fiscalia">
          Fiscalia <span className="text-red-600">*</span>
        </Label>
        <SelectCustom
          name="fiscalia"
          id="fiscalia"
          required
          defaultValue={(assetEdit && assetEdit.fiscalia) || ""}
          onChange={handleChangeInput}
        >
          <option value="" disabled>
            Seleccioná juzgado
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectCustom>
      </div>
      <div>
        <Label className="pt-3" htmlFor="tribunal">
          Tribunal<span className="text-red-600">*</span>
        </Label>
        <SelectCustom
          name="tribunal"
          id="tribunal"
          required
          defaultValue={(assetEdit && assetEdit.tribunal) || ""}
          onChange={handleChangeInput}
        >
          <option value="" disabled>
            Seleccioná tribunal
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </SelectCustom>
      </div>
      <div>
        <Label className="pt-3" htmlFor="causeNumber">
          Numero de la causa<span className="text-red-600">*</span>
        </Label>
        <Input
          id="causeNumber"
          name="causeNumber"
          type="text"
          required
          defaultValue={assetEdit && assetEdit.causeNumber}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor="causeCoverSheet">
          Autos de la causa<span className="text-red-600">*</span>
        </Label>
        <Input
          id="causeCoverSheet"
          name="causeCoverSheet"
          type="text"
          required
          defaultValue={assetEdit && assetEdit.causeCoverSheet}
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex items-center space-x-2 pt-3">
        <Checkbox
          name="thirdParties"
          id="thirdParties"
          checked={assetEdit && assetEdit.thirdParties}
          onCheckedChange={(value) =>
            handleChangeInput({ target: { name: "thirdParties", value } })
          }
        />
        <Label className="" htmlFor="thirdParties">
          ¿Hay terceros involucrados?
        </Label>
      </div>
      {data && data.thirdParties && <ThirdPartForm assetEdit={assetEdit} />}
    </div>
  );
};

export default JudicialInfo;
