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
      <h2 className="text-xl">Destino</h2>
      <div className="flex gap-1">
        {assetDestination.map((destination) => (
          <div key={destination.value} className="my-3">
            <input
              type="radio"
              name="assetDestination"
              className="hidden"
              id={destination.value}
              value={destination.value}
              required
              onChange={handleChangeInput}
            />
            <label
              htmlFor={destination.value}
              className={`border-2 rounded-md p-3 cursor-pointer border-slate-300 text-slate-600 ${
                data && data["assetDestination"] === destination.value
                  ? "bg-slate-600 text-white"
                  : ""
              }`}
            >
              {destination.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationInfo;
