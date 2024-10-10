import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import SelectCustom from "@/components/ui/select-custom";
import SearchableSelect from "@/components/ui/select-searchable";

const RenderField = ({ input, handleChangeInput, assetEdit }) => {
  if (input.type === "select") {
    const [inputOptions, setInputOptions] = useState([]);

    useEffect(() => {
      fetch(input.optionsURL)
        .then((response) => response.text())
        .then((csvData) => {
          setInputOptions(csvData.split("\n"));
        })
        .catch((error) => {
          console.error("Error fetching CSV:", error);
        });
    }, []);

    return (
      <>
        <Label className="pt-3" htmlFor={`extras.${input._id}`}>
          {input.name}
          {input.required && <span className="text-red-600">*</span>}
        </Label>
        <SearchableSelect
          options={inputOptions}
          onChange={handleChangeInput}
          name={`extras.${input._id}`}
          defaultValue={assetEdit && assetEdit.extras[input._id]}
          required={input.required}
        />
      </>
    );
  } else {
    return (
      <div
        className="grid w-full  items-center gap-1.5 my-2 pt-2"
        id={`extras.${input._id}`}
      >
        <Label htmlFor={`extras.${input._id}`}>
          {input.name}
          {input.required && <span className="text-red-600">*</span>}
        </Label>
        <Input
          type={input.type}
          name={`extras.${input._id}`}
          onChange={handleChangeInput}
          defaultValue={assetEdit && assetEdit.extras[input._id]}
          placeholder={input.name}
          required={input.required}
        />
      </div>
    );
  }
};

export default RenderField;
