"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { saveAsset } from "@/lib/server-actions/asset-actions/asset";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const FormAsset = ({ assetCategories }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    extras: {},
  });
  const [assetCategory, setAssetCategory] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAttrChange = (slug, value) => {
    setFormState((prevState) => ({
      ...prevState,
      extras: {
        ...prevState.extras,
        [slug]: value,
      },
    }));
  };

  const handleAssetCategoryChange = (type) => {
    setAssetCategory(type);
    setFormState((prevState) => ({
      ...prevState,
      type: type._id,
      extras: type.extras.reduce((acc, attr) => {
        acc[attr.slug] = "";
        return acc;
      }, {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveAsset(formState);
      router.push("/admin/bien/");
      // Reset form if necessary
    } catch (error) {
      console.log(error);
      console.error("Error saving asset:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
        <Label htmlFor="assetCategory">Tipo de Activo</Label>
        <Select
          name="assetCategory"
          onValueChange={(value) =>
            handleAssetCategoryChange(JSON.parse(value))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {assetCategories.map((type) => (
              <SelectItem key={type._id} value={JSON.stringify(type)}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        {assetCategory && (
          <Input type="hidden" name="type" value={assetCategory._id} />
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="nombre"
            required
          />
        </div>
        <fieldset>
          <legend>Atributos</legend>
          {assetCategory &&
            assetCategory.extras.map((input) => (
              <div
                key={input.slug}
                className="grid w-full max-w-sm items-center gap-1.5"
              >
                <Label htmlFor={`extras.${input.slug}`}>{input.name}</Label>
                <Input
                  type={input.type}
                  name={`extras.${input.slug}`}
                  value={formState.extras[input.slug] || ""}
                  onChange={(e) => handleAttrChange(input.slug, e.target.value)}
                  placeholder={input.name}
                  required={input.required}
                />
              </div>
            ))}
        </fieldset>
        <SubmitButton text="Guardar" />
      </form>
    </>
  );
};

export default FormAsset;
