"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SubCategoryForm from "./sub-category-form";
import CategoryFieldForm from "./category-field-form";
import { saveCompleteCategory } from "@/lib/actions/admin/asset-actions/category";
import { useToast } from "@/components/ui/use-toast";

const requiredFields = {
  category: ["name"],
  extras: ["type", "name", "showCard"],
  subCategories: ["name", "icon", "color"],
};

const CategoryForm = ({ categoryEdit, subCategoriesEdit, extraFields }) => {
  const [category, setCategory] = useState(categoryEdit || { name: "" });
  const [extras, setExtras] = useState(
    extraFields || [
      {
        type: "",
        name: "",
        description: "",
        required: false,
        showCard: "",
        hiddenDownload: false,
        slug: "",
      },
    ]
  );
  const [subCategories, setSubCategories] = useState(subCategoriesEdit || []);
  const [errorsState, setErrorsState] = useState(null);
  const { toast } = useToast();

  const hasError = () => {
    const state = {
      category,
      extras,
      subCategories,
    };
    let complete = false;
    let errors = {
      category: "",
      subCategories: {},
      extras: {},
    };
    Object.keys(requiredFields).forEach((type) => {
      if (Array.isArray(state[type])) {
        state[type].forEach((el, idx) => {
          let indexError = [];
          requiredFields[type].forEach((field) => {
            if (!el[field]) {
              complete = true;
              indexError.push(field);
            }
          });
          errors[type][idx] = indexError;
        });
      } else {
        requiredFields[type].forEach((field) => {
          if (!state[type][field]) {
            complete = true;
            errors[type] = field;
          }
        });
      }
    });
    setErrorsState(errors);
    return complete;
  };

  const handleSubmit = async () => {
    try {
      if (!hasError())
        await saveCompleteCategory(category, subCategories, extras);
    } catch (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creá el formulario para el nuevo tipo de bien</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-lg">1. Nombre y tipologías del bien</h3>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label
              htmlFor="name"
              className={errorsState?.category && "text-red-500"}
            >
              Nombre del nuevo tipo
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Por ejemplo: Vehículo"
              className={errorsState?.category && "border-red-500"}
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              required
            />
          </div>
          <SubCategoryForm
            setSubType={setSubCategories}
            subCategoriesEdit={subCategoriesEdit}
            errors={errorsState}
          />
        </div>
        <br />
        <div>
          <h3 className="text-lg">2. Campos del formulario</h3>
          <CategoryFieldForm
            setExtras={setExtras}
            extraFieldsEdit={extraFields}
            errors={errorsState}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Guardar</Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryForm;
