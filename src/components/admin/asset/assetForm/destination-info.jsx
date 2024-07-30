import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { assetDestination } from "@/lib/utils/constants";

function DestinationInfo({ setDestinationtData }) {
  const [data, setData] = useState(null);

  const handleChangeInput = (event) => {
    if (data) {
      data[event.target.name] = event.target.value;
      setData({ ...data });
    } else {
      const inputData = {
        [event.target.name]: event.target.value,
      };
      setData(inputData);
    }
    setDestinationtData(data);
  };
  return (
    <div>
      <h2 className="text-xl">Titular</h2>

      <RadioGroup
        onValueChange={(value) =>
          handleChangeInput({
            target: { name: "asset-destination", value },
          })
        }
        className="flex"
      >
        {assetDestination.map((destination) => (
          <div className="flex items-center space-x-2" key={destination.value}>
            <RadioGroupItem
              value={destination.value}
              id={destination.value}
              className="hidden"
            />
            <Label
              htmlFor={destination.value}
              className={`border-2 rounded-md p-3 cursor-pointer border-slate-300 text-slate-600 ${
                data && data["asset-destination"] === destination.value
                  ? "bg-slate-600 text-white"
                  : ""
              }`}
            >
              {destination.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default DestinationInfo;
