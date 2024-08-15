import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";
import { getSubCategoriesByCategory } from "@/lib/server-actions/admin/asset-actions/sub-category";
import { fontAwesomeIcons } from "@/lib/utils/constants";
import { getCategories } from "@/lib/server-actions/admin/asset-actions/category";

const AssetInfo = ({ setAssetData }) => {
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState({});
  const [subCategories, setSubCategories] = useState(null);
  const [extraFields, setExtraFields] = useState(null);

  const fetchCategories = async () => {
    const categoriesFetch = await getCategories();
    setCategories(categoriesFetch);
  };

  const handleCategory = async (category) => {
    const extraFields = await getExtraFieldsByCategory(category);
    const subCategories = await getSubCategoriesByCategory(category);
    setExtraFields(extraFields);
    setSubCategories(subCategories);
  };

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
    if (event.target.name === "category") {
      handleCategory(event.target.value);
      setData({ category: event.target.value });
    }
    setAssetData(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="px-1">
      <div className="flex flex-col w-full space-y-4 bg-gray-50">
        {categories && (
          <div className="pt-3">
            <Label htmlFor="category">
              Tipo de Activo <span className="text-red-600">*</span>
            </Label>
            <Select
              name="category"
              required
              onValueChange={(value) =>
                handleChangeInput({ target: { name: "category", value } })
              }
            >
              <SelectTrigger>
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
        )}
      </div>
      {subCategories && (
        <div className="pt-3">
          <Label htmlFor="subCategory">
            Sub-categoria <span className="text-red-600">*</span>
          </Label>
          <Select
            name="subCategory"
            required
            onValueChange={(value) =>
              handleChangeInput({ target: { name: "subCategory", value } })
            }
          >
            <SelectTrigger>
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
                  <span className="ml-3 inline-block">{subCategory.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {extraFields && (
        <div className="pt-3">
          <h2>Atributos</h2>
          {extraFields.map((input) => (
            <div
              key={input.slug}
              className="grid w-full  items-center gap-1.5 my-2 pt-2"
              id={`extras.${input.slug}`}
            >
              <Label htmlFor={`extras.${input.slug}`}>
                {input.name}
                {input.required && <span className="text-red-600">*</span>}
              </Label>
              <Input
                type={input.type}
                name={`extras.${input.slug}`}
                onChange={handleChangeInput}
                placeholder={input.name}
                required={input.required}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetInfo;
