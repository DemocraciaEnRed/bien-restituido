import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const RenderThirdParties = ({ number, deleteThird }) => {
  const [dataActorType, setDataActorType] = useState(null);

  return (
    <div key={number} className="bg-slate-200 p-4 rounded-lg mb-3">
      <div className="flex justify-between">
        <h5>Tercero nº {number}</h5>
        <Trash
          onClick={deleteThird}
          data-number={number}
          className="cursor-pointer"
        />
      </div>
      <div>
        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-3">
          tipo de actor <span className="text-red-600">*</span>
        </p>
        <div className="flex gap-1">
          <div className="my-4">
            <input
              type="radio"
              name={`third.${number}-actorType`}
              className="hidden"
              id={`victim${number}`}
              value="victim"
              required
              onChange={(event) => setDataActorType(event.target.value)}
            />
            <label
              htmlFor={`victim${number}`}
              className={`border-2 rounded-md p-3 cursor-pointer border-slate-300   ${
                dataActorType && dataActorType === "victim"
                  ? "bg-slate-600 text-white"
                  : "text-slate-600 bg-white"
              }`}
            >
              Victima
            </label>
          </div>
          <div className="my-4">
            <input
              type="radio"
              name={`third.${number}-actorType`}
              className="hidden"
              id={`civil-actor${number}`}
              value="civil-actor"
              required
              onChange={(event) => setDataActorType(event.target.value)}
            />
            <label
              htmlFor={`civil-actor${number}`}
              className={`border-2 rounded-md p-3 cursor-pointer border-slate-300   ${
                dataActorType && dataActorType === "civil-actor"
                  ? "bg-slate-600 text-white"
                  : "text-slate-600 bg-white"
              }`}
            >
              Actor civil
            </label>
          </div>
        </div>
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}-lastName`}>
          Apellido<span className="text-red-600">*</span>
        </Label>
        <Input
          id={`third.${number}-lastName`}
          name={`third.${number}-lastName`}
          type="text"
          required
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}-name`}>
          Nombre<span className="text-red-600">*</span>
        </Label>
        <Input
          id={`third.${number}-name`}
          name={`third.${number}-name`}
          type="text"
          required
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}-typeId`}>
          Tipo de identificación<span className="text-red-600">*</span>
        </Label>
        <Input
          id={`third.${number}-typeId`}
          name={`third.${number}-typeId`}
          type="text"
          required
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor={`third.${number}-numberId`}>
          Numero de identificación<span className="text-red-600">*</span>
        </Label>
        <Input
          id={`third.${number}-numberId`}
          name={`third.${number}-numberId`}
          type="text"
          required
        />
      </div>
    </div>
  );
};

const ThirdPartForm = () => {
  const [quantity, setQuantity] = useState(1);
  const list = Array.from({ length: quantity }, (_, index) => index + 1);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const deleteThird = (event) => {
    console.log(event.target.dataset);
  };

  return (
    <div>
      {list.map((number) => (
        <RenderThirdParties
          key={number}
          number={number}
          deleteThird={deleteThird}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white rounded-full omittedButton"
        onClick={addQuantity}
      >
        Agregar nuevo involucrado
      </Button>
    </div>
  );
};

export default ThirdPartForm;
