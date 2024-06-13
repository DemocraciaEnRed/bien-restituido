"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { saveAssetType } from "@/lib/server-actions/asset-actions/asset-type";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";

const inputTypes = [
  {
    type: "text",
    friendlyName: "Texto",
    description: "Permite al usuario ingresar texto libre.",
  },
  {
    type: "password",
    friendlyName: "Contraseña",
    description: "Oculta el texto ingresado, ideal para contraseñas.",
  },
  {
    type: "email",
    friendlyName: "Email",
    description:
      "Valida que el texto ingresado sea una dirección de correo electrónico.",
  },
  {
    type: "number",
    friendlyName: "Numero",
    description:
      "Permite ingresar solo números, con opciones para definir un rango.",
  },
  {
    type: "tel",
    friendlyName: "Teléfono",
    description: "Permite ingresar un número de teléfono.",
  },
  {
    type: "url",
    friendlyName: "Dirección URL",
    description: "Valida que el texto ingresado sea una URL.",
  },
  {
    type: "date",
    friendlyName: "Fecha",
    description: "Proporciona un selector de fecha.",
  },
  {
    type: "time",
    friendlyName: "Hora",
    description: "Permite seleccionar una hora.",
  },
  {
    type: "color",
    friendlyName: "Color",
    description: "Proporciona un selector de color.",
  },
  {
    type: "search",
    friendlyName: "Busqueda",
    description: "Similar al texto, pero con diseño optimizado para búsquedas.",
  },
  {
    type: "file",
    friendlyName: "Archivo",
    description: "Permite al usuario seleccionar un archivo para cargar.",
  },
  {
    type: "checkbox",
    friendlyName: "si/no",
    description: "Permite seleccionar múltiples opciones.",
  },
  {
    type: "range",
    friendlyName: "rango",
    description: "Permite seleccionar un valor dentro de un rango definido.",
  },
  {
    type: "hidden",
    friendlyName: "oculto",
    description:
      "Campo que no es visible para el usuario pero que se envía con el formulario.",
  },
];

const initialNewState = {
  typeNewAttr: "",
  nameNewAttr: "",
  descriptionNewAttr: "",
  requiredNewAttr: false,
};

const NewAssetType = () => {
  const [extras, setExtras] = useState([]);
  const [formState, formAction] = useFormState(saveAssetType, "");

  const [newAttr, setNewAttr] = useState(initialNewState);

  const setAttr = (e) => {
    setNewAttr({ ...newAttr, [e.target.name]: e.target.value });
  };

  const addAttr = () => {
    setExtras([
      ...extras,
      {
        type: newAttr.typeNewAttr,
        friendlyName: "",
        name: newAttr.nameNewAttr,
        description: newAttr.descriptionNewAttr,
        required: newAttr.requiredNewAttr,
        slug: createSlug(newAttr.nameNewAttr),
      },
    ]);
    setNewAttr(initialNewState);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="z-10 w-full  overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
          <h6>Nuevo campo</h6>
          <div className="flex w-full flex-wrap items-end gap-1.5 justify-between ">
            <div>
              <Label htmlFor="typeNewAttr">Tipo</Label>
              <Select
                name="typeNewAttr"
                className="w-full"
                onValueChange={(e) =>
                  setAttr({
                    target: {
                      name: "typeNewAttr",
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder="Elegir tipo"
                    value={newAttr.typeNewAttr}
                  />
                </SelectTrigger>
                <SelectContent>
                  {inputTypes.map((typeInput) => (
                    <SelectItem key={typeInput.type} value={typeInput.type}>
                      {typeInput.friendlyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nameNewAttr">Nombre campo</Label>
              <Input
                type="text"
                name="nameNewAttr"
                id="nameNewAttr"
                placeholder="nombre"
                value={newAttr.nameNewAttr}
                onChange={setAttr}
              />
            </div>
            <div>
              <Label htmlFor="descriptionNewAttr">Descripción campo</Label>
              <Input
                type="text"
                name="descriptionNewAttr"
                id="descriptionNewAttr"
                placeholder="nombre"
                value={newAttr.descriptionNewAttr}
                onChange={setAttr}
              />
            </div>
            <div>
              <Label htmlFor="requiredNewAttr">requerido</Label>
              <Checkbox
                name="requiredNewAttr"
                id="requiredNewAttr"
                checked={newAttr.requiredNewAttr}
                onCheckedChange={(e) =>
                  setAttr({
                    target: {
                      name: "requiredNewAttr",
                      value: e,
                    },
                  })
                }
              />
            </div>
            <Button onClick={addAttr}>agregar nuevo tipo</Button>
          </div>
        </div>
        <form
          action={formAction}
          className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="nombre"
              required
            />
          </div>
          {extras.length > 0 && (
            <div>
              <input
                type="hidden"
                name="extrasFields"
                value={JSON.stringify(extras)}
                className="w-full"
                readOnly
              />
              <div className="flex">
                {extras.map((attr, idx) => (
                  <div key={idx} className="w-3/12">
                    <p>nombre tipo input: {attr.name}</p>
                    <p>tipo de input atributo: {attr.type}</p>
                    <p>descripcion del input: {attr.description}</p>
                    <p>slug del input: {createSlug(newAttr.nameNewAttr)}</p>
                    {/* <div
                  key={idx}
                  className="grid w-full max-w-sm items-center gap-1.5"
                >
                  <Label htmlFor={attr.slug}>{extras.name}</Label>
                  <Input
                    type={attr.type}
                    name={attr.slug}
                    id={attr.slug}
                    required={attr.required}
                  />
                </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formState && (
            <div className="text-red-500">
              <p>{formState}</p>
            </div>
          )}
          <SubmitButton text="guardar" />
        </form>
      </div>
    </div>
  );
};

export default NewAssetType;
