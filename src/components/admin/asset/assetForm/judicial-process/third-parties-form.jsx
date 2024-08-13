import React, { useState } from "react";

import ThirdPart from "./third-pard";
import { Button } from "@/components/ui/button";

const initialState = {
  type: "",
  name: "",
  lastName: "",
  typeId: "",
  numberId: "",
};

const ThirdPartForm = () => {
  const [thirdList, setThirdList] = useState([structuredClone(initialState)]);

  const addQuantity = () => {
    setThirdList([...thirdList, structuredClone(initialState)]);
  };

  const setValues = (event) => {
    const [_, index, name] = event.target.name.split(".");
    const third = thirdList[index];
    third[name] = event.target.value;
    setThirdList([...thirdList]);
  };

  const deleteThirdPart = (idx) => {
    thirdList.splice(idx, 1);
    setThirdList([...thirdList]);
  };

  return (
    <div>
      {thirdList.map((thirdPart, idx) => (
        <ThirdPart
          key={idx}
          number={idx}
          values={thirdPart}
          deleteThirdPart={deleteThirdPart}
          setValues={setValues}
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
