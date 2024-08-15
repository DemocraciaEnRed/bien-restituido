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
import SelectCustom from "@/components/ui/select-custom";
import { assert } from "react-resizable-panels";

const AssetInfo = ({ assetEdit }) => {
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(assetEdit || {});
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
    if (Object.keys(data).length === 0 && data.constructor === Object) {
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
  };

  useEffect(() => {
    fetchCategories();
    if (assetEdit)
      handleChangeInput({
        target: { name: "category", value: assetEdit.category },
      });
  }, []);

  return (
    <div className="px-1">
      <div className="flex flex-col w-full space-y-4 bg-gray-50">
        {categories && (
          <div className="pt-3">
            <Label htmlFor="category">
              Tipo de Activo <span className="text-red-600">*</span>
            </Label>
            <SelectCustom
              name="category"
              required
              defaultValue={(assetEdit && assetEdit.category) || ""}
              onChange={handleChangeInput}
            >
              <option value="" disabled>
                Categoría
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </SelectCustom>
          </div>
        )}
      </div>
      {subCategories && (
        <div className="pt-3 relative">
          <Label htmlFor="subCategory">
            Sub-categoria <span className="text-red-600">*</span>
          </Label>
          <SelectCustom
            name="subCategory"
            required
            defaultValue={(assetEdit && assetEdit.subCategory) || ""}
            onChange={handleChangeInput}
          >
            <option value="" disabled>
              Sub-categoría
            </option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
          </SelectCustom>
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
                defaultValue={assetEdit && assetEdit.extras[input.slug]}
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
