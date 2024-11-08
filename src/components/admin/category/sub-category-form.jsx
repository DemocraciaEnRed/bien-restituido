import { Button } from "@/components/ui/button";
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
import { fontAwesomeIcons } from "@/lib/utils/constants";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const SubCategoryForm = ({ setSubType, subCategoriesEdit, errors }) => {
  const [subCategories, setSubCategories] = useState(subCategoriesEdit || []);

  const addNewSubtypeField = () => {
    const subCategoriesList = [
      ...subCategories,
      {
        name: "",
        icon: "",
        color: "",
      },
    ];
    setSubCategories(subCategoriesList);
    setSubType(subCategoriesList);
  };

  const handleSubType = (type, idx, value) => {
    const subCategory = subCategories[idx];
    subCategory[type] = value;
    setSubCategories([...subCategories]);
    setSubType(subCategories);
  };

  const handleRemove = (idx) => {
    subCategories.splice(idx, 1);
    setSubCategories([...subCategories]);
    setSubType(subCategories);
  };

  const renderSubCategories = () => {
    return subCategories.map((el, idx) => (
      <div className="my-2" key={idx}>
        <div className="flex  justify-between items-center">
          <div className="flex gap-4 items-center w-11/12 border-r-2">
            <p>{idx + 1}.</p>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
              <Label
                htmlFor="name"
                className={
                  errors?.subCategories[idx]?.includes("name") && "text-red-500"
                }
              >
                Nombre del subtipo
              </Label>
              <Input
                type="text"
                placeholder="Nombre del subtipo ej: Motovehiculo"
                className={
                  errors?.subCategories[idx]?.includes("name") &&
                  "border-red-500"
                }
                onChange={(e) => handleSubType("name", idx, e.target.value)}
                value={el.name}
                required
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5 my-3">
              <Label
                htmlFor=""
                className={
                  errors?.subCategories[idx]?.includes("icon") && "text-red-500"
                }
              >
                icono del subtipo
              </Label>
              <Select
                onValueChange={(value) => handleSubType("icon", idx, value)}
              >
                <SelectTrigger
                  className={` ${
                    errors?.subCategories[idx]?.includes("icon") &&
                    "border-red-500"
                  }`}
                >
                  {el.icon ? (
                    fontAwesomeIcons.find((icon) => icon.name === el.icon)?.icon
                  ) : (
                    <SelectValue placeholder="Icono" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {fontAwesomeIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      {icon.icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid  max-w-sm items-center gap-1.5 my-3">
              <Label
                htmlFor="color"
                className={
                  errors?.subCategories[idx]?.includes("color") &&
                  "text-red-500"
                }
              >
                color del subtipo
              </Label>
              <Input
                type="color"
                className={
                  errors?.subCategories[idx]?.includes("color") &&
                  "border-red-500"
                }
                onChange={(e) => handleSubType("color", idx, e.target.value)}
                value={el.color}
                required
              />
            </div>
          </div>
          <div className="w-1/12">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full"
              onClick={() => handleRemove(idx)}
            >
              <Trash color="red" />
            </Button>
          </div>
        </div>
        <Separator className="w-9/12 mx-auto mt-4" />
      </div>
    ));
  };
  return (
    <>
      {renderSubCategories()}
      <Button
        type="button"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white rounded-full"
        onClick={addNewSubtypeField}
      >
        Agregar {Object.keys(subCategories).length > 0 && "otro"} subtipo +
      </Button>
    </>
  );
};

export default SubCategoryForm;
