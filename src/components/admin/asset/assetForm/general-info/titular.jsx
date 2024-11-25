import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import TitularForm from "./titular-form";

const initialState = {
  Name: "",
  LastName: "",
  IdType: "",
  NumberId: "",
  Address: "",
};

const Titular = ({ assetEdit }) => {
  const [titularList, setTitularList] = useState(
    assetEdit?.owner || [structuredClone(initialState)]
  );

  const addQuantity = () => {
    setTitularList([...titularList, structuredClone(initialState)]);
  };

  const setValues = (event) => {
    const [_, index, name] = event.target.name.split(".");
    const titular = titularList[index];
    titular[name] = event.target.value;
    setTitularList([...titularList]);
  };

  const deleteTitular = (idx) => {
    titularList.splice(idx, 1);
    setTitularList([...titularList]);
  };

  return (
    <div>
      {titularList.map((titular, idx) => (
        <TitularForm
          key={idx}
          number={idx}
          values={titular}
          deleteTitular={deleteTitular}
          setValues={setValues}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-white rounded-full omittedButton mt-3"
        onClick={addQuantity}
      >
        Agregar nuevo titular
      </Button>
    </div>
  );
};

export default Titular;
