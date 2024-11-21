import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import SelectCustom from "@/components/ui/select-custom";
import {
  getCategories,
  getExtraFieldsBySubCategory,
  getSubCategoriesByCategory,
} from "@/lib/actions/home/fetch-data";
import RenderField from "./field";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import BigSkeleton from "../big-skeleton";

const AssetInfo = ({ assetEdit }) => {
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(assetEdit || {});
  const [subCategories, setSubCategories] = useState(null);
  const [extraFields, setExtraFields] = useState(null);
  const [editFile, setEditFile] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoadStep = async () => {
    setLoading(true);
    await fetchCategories();
    if (assetEdit)
      await handleChangeInput({
        target: { name: "category", value: assetEdit.category },
      });
    setLoading(false);
  };

  useEffect(() => {
    LoadStep();
  }, []);

  const fetchCategories = async () => {
    const categoriesFetch = await getCategories();
    setCategories(categoriesFetch);
  };

  const handleCategory = async (categoryId) => {
    const subCategories = await getSubCategoriesByCategory(categoryId);

    setSubCategories(subCategories);
  };

  const handleSubCategory = async (subCategoryId) => {
    const extraFields = await getExtraFieldsBySubCategory(subCategoryId);

    setExtraFields(extraFields);
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
    if (event.target.name === "subCategory") {
      handleSubCategory(event.target.value);
      setData({ subCategory: event.target.value });
    }
  };

  const addInputToEditFile = (inputName) => {
    if (!editFile.includes(inputName)) setEditFile([...editFile, inputName]);
  };

  if (!loading)
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
        <div className="pt-3">
          <Label htmlFor="assetImage">Imagen</Label>
          {assetEdit &&
          assetEdit.assetImageURL &&
          !editFile.includes("assetImage") ? (
            <div className="flex justify-between">
              <a
                className={buttonVariants({ variant: "link" })}
                target="_blank"
                href={assetEdit.assetImageURL}
              >
                {assetEdit.assetImage}
              </a>
              <input
                type="hidden"
                name="assetImage"
                value={assetEdit.assetImage}
              />
              <Button
                onClick={() => addInputToEditFile("assetImage")}
                variant="link"
              >
                Cambiar
              </Button>
            </div>
          ) : (
            <>
              <Input
                id="assetImage"
                type="file"
                name="assetImage"
                accept="image/*"
                onChange={handleChangeInput}
              />
            </>
          )}
        </div>

        {extraFields && (
          <div className="mt-3">
            <Separator className="w-1/2 my-3 h-1 mx-auto" />

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
          </div>
        )}
      </div>
    );
  else return <BigSkeleton />;
};

export default AssetInfo;
