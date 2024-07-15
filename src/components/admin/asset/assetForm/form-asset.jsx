"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { saveAsset } from "@/lib/server-actions/admin/asset-actions/asset";
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
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";
import { getSubCategoriesByCategory } from "@/lib/server-actions/admin/asset-actions/sub-category";
import { fontAwesomeIcons } from "@/lib/utils/constants";

const AssetCategoryInfo = ({ categories }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    subCategory: "",
    extras: {},
  });
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [extraFields, setExtraFields] = useState(null);

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

  const handleCategory = async (category) => {
    setCategory(category);
    const extraFields = await getExtraFieldsByCategory(category);
    const subCategories = await getSubCategoriesByCategory(category);
    setExtraFields(extraFields);
    setSubCategories(subCategories);
    setFormState((prevState) => ({
      ...prevState,
      category: category,
      extras: extraFields.reduce((acc, attr) => {
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
      console.error(error);
      console.error("Error saving asset:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
        <Label htmlFor="category">Tipo de Activo</Label>
        <Select
          name="category"
          onValueChange={(value) => handleCategory(value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        {category && <Input type="hidden" name="type" value={category._id} />}
        {subCategories && (
          <>
            <Label htmlFor="subcategory">Sub-categoria</Label>
            <Select
              name="subcategory"
              onValueChange={(value) =>
                handleChange({ target: { name: "subCategory", value } })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sub-categoria" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory._id} value={subCategory._id}>
                    {
                      fontAwesomeIcons.find(
                        (icon) => icon.name == subCategory.icon
                      ).icon
                    }
                    <span className="ml-3 inline-block">
                      {subCategory.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
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
          {extraFields &&
            extraFields.map((input) => (
              <div
                key={input.slug}
                className="grid w-full max-w-sm items-center gap-1.5 my-2"
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

export default AssetCategoryInfo;
