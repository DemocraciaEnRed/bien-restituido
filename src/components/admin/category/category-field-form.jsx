import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fieldsInputTypes, showCardOptions } from "@/lib/utils/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash } from "lucide-react";

const CategoryFieldForm = ({ setExtras, extraFieldsEdit, errors }) => {
  const [attrs, setAttrs] = useState(
    extraFieldsEdit || [
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

  const [editFile, setEditFile] = useState([]);

  const setAttr = (type, idx, value) => {
    const attr = attrs[idx];
    attr[type] = value;
    setAttrs([...attrs]);
    setExtras(attrs);
  };

  const addAttr = () => {
    const attrsList = [
      ...attrs,
      {
        type: "",
        name: "",
        description: "",
        required: false,
        showCard: "",
        hiddenDownload: false,
        slug: "",
      },
    ];
    setAttrs(attrsList);
    setExtras(attrsList);
  };

  const handleRemove = (idx) => {
    attrs.splice(idx, 1);
    setAttrs([...attrs]);
    setExtras(attrs);
  };

  const addInputToEditFile = (inputName) => {
    if (!editFile.includes(inputName)) setEditFile([...editFile, inputName]);
  };

  const renderFields = () => {
    return attrs.map((el, idx) => (
      <div
        key={idx}
        className="flex w-full flex-wrap items-center justify-between "
      >
        <div className="w-11/12 j border-r-2 pr-4">
          <div className="flex justify-between items-center">
            <div className="w-3/12 pr-1">
              <Label
                htmlFor={`typeAttr-${idx}`}
                className={
                  errors?.extras[idx]?.includes("type") && "text-red-500"
                }
              >
                Tipo de campo
              </Label>
              <Select
                name={`typeAttr-${idx}`}
                className="w-full"
                onValueChange={(value) => setAttr("type", idx, value)}
              >
                <SelectTrigger
                  className={
                    errors?.extras[idx]?.includes("type") && "border-red-500"
                  }
                >
                  {fieldsInputTypes.find((input) => el.type === input.type)
                    ?.friendlyName || (
                    <SelectValue placeholder="Elegir tipo de campo" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {fieldsInputTypes.map((typeInput) => (
                    <SelectItem key={typeInput.type} value={typeInput.type}>
                      {typeInput.friendlyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-3/12 pr-1">
              <Label
                htmlFor={`nameAttr-${idx}`}
                className={
                  errors?.extras[idx]?.includes("name") && "text-red-500"
                }
              >
                Nombre del campo
              </Label>
              <Input
                type="text"
                name={`nameAttr-${idx}`}
                placeholder="nombre"
                className={
                  errors?.extras[idx]?.includes("name") && "border-red-500"
                }
                value={attrs[idx].name}
                onChange={(e) => setAttr("name", idx, e.target.value)}
              />
            </div>
            <div className="w-4/12 pr-1">
              <Label
                htmlFor={`desctiptionAttr-${idx}`}
                className={
                  errors?.extras[idx]?.includes("description") && "text-red-500"
                }
              >
                Descripción del campo(opcional)
              </Label>
              <Input
                type="text"
                name={`desctiptionAttr-${idx}`}
                placeholder="descripción"
                value={attrs[idx].description}
                className={
                  errors?.extras[idx]?.includes("description") &&
                  "border-red-500"
                }
                onChange={(e) => setAttr("description", idx, e.target.value)}
              />
            </div>
            <div className="flex items-end  w-2/12 pt-4">
              <Label htmlFor={`requireAttr-${idx}`}>¿Campo obligatorio?</Label>
              <Checkbox
                className="ml-2"
                name={`requireAttr-${idx}`}
                checked={attrs[idx].required}
                onCheckedChange={(value) => setAttr("required", idx, value)}
              />
            </div>
          </div>
          <div className="flex mt-2">
            <div className="w-3/12 pr-1">
              <Label
                htmlFor={`showCard-${idx}`}
                className={
                  errors?.extras[idx]?.includes("showCard") && "text-red-500"
                }
              >
                ¿Mostrar en el card?
              </Label>
              <Select
                name={`showCard-${idx}`}
                className="w-full"
                onValueChange={(value) => setAttr("showCard", idx, value)}
              >
                <SelectTrigger
                  className={
                    errors?.extras[idx]?.includes("showCard") &&
                    "border-red-500"
                  }
                >
                  {showCardOptions[el.showCard]?.name || (
                    <SelectValue placeholder="Siempre/Ampliado/No" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {Object.values(showCardOptions).map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {attrs[idx].type === "select" && (
              <div className="w-3/12 pr-1">
                <Label
                  htmlFor={`selectablesOptions-${idx}`}
                  className={
                    errors?.extras[idx]?.includes("name") && "text-red-500"
                  }
                >
                  Archivo con opciones
                </Label>
                {attrs[idx].optionsURL &&
                !editFile.includes(`selectablesOptions-${idx}`) ? (
                  <div className="flex justify-between">
                    <a
                      className={buttonVariants({ variant: "link" })}
                      target="_blank"
                      href={attrs[idx].optionsURL}
                    >
                      {attrs[idx].selectablesOptions}
                    </a>
                    <input
                      type="hidden"
                      name={`selectablesOptions-${idx}`}
                      value={attrs[idx].selectablesOptions}
                    />
                    <Button
                      onClick={() =>
                        addInputToEditFile(`selectablesOptions-${idx}`)
                      }
                    >
                      Cambiar
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    name={`selectablesOptions-${idx}`}
                    placeholder="selectablesOptions"
                    className={
                      errors?.extras[idx]?.includes("selectablesOptions") &&
                      "border-red-500"
                    }
                    onChange={(e) =>
                      setAttr("selectablesOptions", idx, e.target.files[0])
                    }
                  />
                )}
              </div>
            )}
            <div className="flex items-center pt-4 ">
              <Label htmlFor={`hiddenDownload-${idx}`}>
                ¿Ocultar en descargable usuario?
              </Label>
              <Checkbox
                name={`hiddenDownload-${idx}`}
                className="ml-2"
                checked={attrs[idx].hiddenDownload}
                onCheckedChange={(value) =>
                  setAttr("hiddenDownload", idx, value)
                }
              />
            </div>
          </div>
          <hr className="mt-5" />
        </div>
        <div className="w-1/12 text-center">
          <Button
            type="button"
            variant="ghost"
            className=""
            onClick={() => handleRemove(idx)}
          >
            <Trash color="red" />
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="flex flex-col w-full space-y-4 py-8 ">
        {renderFields()}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={addAttr}
        className="border-primary text-primary hover:bg-primary hover:text-white rounded-full"
      >
        agregar nuevo tipo +
      </Button>
    </div>
  );
};

export default CategoryFieldForm;
