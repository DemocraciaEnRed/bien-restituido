import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { assetDestination } from "@/lib/utils/constants";
import { Input } from "@/components/ui/input";
import Auction from "./auction";
import Reuse from "./reuse";

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

  const formDestinationType = {
    auction: <Auction />,
    reuse: <Reuse />,
    Testing: null,
  };

  return (
    <div className="px-1">
      <h2 className="text-xl">Destino</h2>
      <div className="flex gap-1">
        {assetDestination.map((destination) => (
          <div key={destination.value} className="my-3">
            <input
              type="radio"
              name="destination"
              className="hidden"
              id={destination.value}
              value={destination.value}
              required
              onChange={handleChangeInput}
            />
            <label
              htmlFor={destination.value}
              className={`border-2 rounded-md p-3 cursor-pointer border-slate-300 text-slate-600 ${
                data && data["destination"] === destination.value
                  ? "bg-slate-600 text-white"
                  : ""
              }`}
            >
              {destination.name}
            </label>
          </div>
        ))}
      </div>
      {data && data.destination && (
        <div className="my-3">
          <h2 className="text-xl">Información de destino</h2>
          <div className="my-3">
            <Label className="pt-3 mb-2" htmlFor="destinationResolution">
              Resolución de decomiso<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationResolution"
              type="file"
              required
              className="mt-2"
              name="destinationResolution"
              onChange={handleChangeInput}
            />
          </div>
          {formDestinationType[data.destination]}
        </div>
      )}
    </div>
  );
}

export default DestinationInfo;
