import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatKeyObject } from "@/lib/utils";
import React, { useState } from "react";

const destinationStatus = [
  { value: "pending", name: "A subastar" },
  { value: "completed", name: "Subastado" },
];

const Auction = ({ assetEdit }) => {
  const [data, setData] = useState(
    formatKeyObject(assetEdit?.destinationInfo, "destinationInfo") || null
  );

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
  };
  return (
    <div>
      <div className="my-3">
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Estado
          <span className="text-red-600 ">*</span>
        </label>
        <div className="flex gap-1">
          {destinationStatus.map((status) => (
            <div key={status.value} className="my-3">
              <input
                type="radio"
                name="destinationInfo.status"
                className="hidden"
                id={status.value}
                value={status.value}
                required
                checked={
                  assetEdit && data["destinationInfo.status"] === status.value
                }
                onChange={handleChangeInput}
              />
              <label
                htmlFor={status.value}
                className={`border-2 rounded-md p-3 cursor-pointer border-slate-300 text-slate-600 ${
                  data && data["destinationInfo.status"] === status.value
                    ? "bg-slate-600 text-white"
                    : ""
                }`}
              >
                {status.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {data && data["destinationInfo.status"] === "completed" && (
        <div>
          <Label className="pt-3" htmlFor="destinationInfo.amount">
            Monto de subasta<span className="text-red-600">*</span>
          </Label>
          <Input
            id="destinationInfo.amount"
            name="destinationInfo.amount"
            type="number"
            disabled={
              !data || (data && data["destinationInfo.status"] === "pending")
            }
            defaultValue={assetEdit?.destinationInfo.amount}
            required
            onChange={handleChangeInput}
          />
        </div>
      )}
    </div>
  );
};

export default Auction;
