import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import SelectCustom from "@/components/ui/select-custom";
import {
  getCategories,
  getExtraFieldsByCategory,
  getSubCategoriesByCategory,
} from "@/lib/actions/home/fetch-data";
import RenderField from "./field";

const AssetInfo = ({ assetEdit }) => {
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(assetEdit || {});
  const [subCategories, setSubCategories] = useState(null);
  const [extraFields, setExtraFields] = useState(null);

  const fetchCategories = async () => {
    const categoriesFetch = await getCategories();
    setCategories(categoriesFetch);
  };

  const handleCategory = async (categoryId) => {
    const extraFields = await getExtraFieldsByCategory(categoryId);
    const subCategories = await getSubCategoriesByCategory(categoryId);

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
          <div>
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
            <RenderField
              key={input._id}
              input={input}
              handleChangeInput={handleChangeInput}
              assetEdit={assetEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetInfo;
