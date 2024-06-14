import { useState } from "react";
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

import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";
import { saveAssetCategory } from "@/lib/server-actions/asset-actions/asset-category";
import { fieldsInputTypes, initialNewFieldState } from "@/lib/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CategoryForm = () => {
  const [extras, setExtras] = useState([]);
  const [formState, formAction] = useFormState(saveAssetCategory, "");

  const [newAttr, setNewAttr] = useState(initialNewFieldState);

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
    <Card>
      <CardHeader>
        <CardTitle>Creá el formulario para el nuevo tipo de bien</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="">
          <h3 className="text-lg">Nombre y tipologías del bien</h3>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label htmlFor="name">Nombre del nuevo tipo</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Por ejemplo: Vehículo"
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
    // <div className="z-10 w-full  overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
    //   <form
    //     action={formAction}
    //     className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    //   >
    //     {extras.length > 0 && (
    //       <div>
    //         <input
    //           type="hidden"
    //           name="extrasFields"
    //           value={JSON.stringify(extras)}
    //           className="w-full"
    //           readOnly
    //         />
    //         <div className="flex">
    //           {extras.map((attr, idx) => (
    //             <div key={idx} className="w-3/12">
    //               <p>nombre tipo input: {attr.name}</p>
    //               <p>tipo de input atributo: {attr.type}</p>
    //               <p>descripcion del input: {attr.description}</p>
    //               <p>slug del input: {createSlug(newAttr.nameNewAttr)}</p>
    //               {/* <div
    //             key={idx}
    //             className="grid w-full max-w-sm items-center gap-1.5"
    //           >
    //             <Label htmlFor={attr.slug}>{extras.name}</Label>
    //             <Input
    //               type={attr.type}
    //               name={attr.slug}
    //               id={attr.slug}
    //               required={attr.required}
    //             />
    //           </div> */}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {formState && (
    //       <div className="text-red-500">
    //         <p>{formState}</p>
    //       </div>
    //     )}
    //     <SubmitButton text="guardar" />
    //   </form>
    //   <div className="flex flex-col w-full space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
    //     <h6>Nuevo campo</h6>

    //     <div className="flex w-full flex-wrap items-end gap-1.5 justify-between ">
    //       <div>
    //         <Label htmlFor="typeNewAttr">Categoria</Label>
    //         <Select
    //           name="typeNewAttr"
    //           className="w-full"
    //           onValueChange={(e) =>
    //             setAttr({
    //               target: {
    //                 name: "typeNewAttr",
    //                 value: e,
    //               },
    //             })
    //           }
    //         >
    //           <SelectTrigger className="w-[180px]">
    //             <SelectValue
    //               placeholder="Elegir categoria"
    //               value={newAttr.typeNewAttr}
    //             />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {fieldsInputTypes.map((typeInput) => (
    //               <SelectItem key={typeInput.type} value={typeInput.type}>
    //                 {typeInput.friendlyName}
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>
    //       <div>
    //         <Label htmlFor="nameNewAttr">Nombre campo</Label>
    //         <Input
    //           type="text"
    //           name="nameNewAttr"
    //           id="nameNewAttr"
    //           placeholder="nombre"
    //           value={newAttr.nameNewAttr}
    //           onChange={setAttr}
    //         />
    //       </div>
    //       <div>
    //         <Label htmlFor="descriptionNewAttr">Descripción campo</Label>
    //         <Input
    //           type="text"
    //           name="descriptionNewAttr"
    //           id="descriptionNewAttr"
    //           placeholder="nombre"
    //           value={newAttr.descriptionNewAttr}
    //           onChange={setAttr}
    //         />
    //       </div>
    //       <div>
    //         <Label htmlFor="requiredNewAttr">requerido</Label>
    //         <Checkbox
    //           name="requiredNewAttr"
    //           id="requiredNewAttr"
    //           checked={newAttr.requiredNewAttr}
    //           onCheckedChange={(e) =>
    //             setAttr({
    //               target: {
    //                 name: "requiredNewAttr",
    //                 value: e,
    //               },
    //             })
    //           }
    //         />
    //       </div>
    //       <Button onClick={addAttr}>agregar nuevo tipo</Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CategoryForm;
