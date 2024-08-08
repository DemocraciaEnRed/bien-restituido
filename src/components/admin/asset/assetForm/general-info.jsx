import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  getLocation,
  getProvinces,
} from "@/lib/server-actions/admin/asset-actions/location";

import React from "react";
import { ChevronDown } from "lucide-react";

const GeneralInfo = ({ setGeneralData }) => {
  const [data, setData] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [locations, setLocations] = useState(null);
  const [province, setProvince] = useState("");

  const fetchProvinces = async () => {
    let provincesFetch = await getProvinces();
    setProvinces(provincesFetch.provincias);
  };

  const handleProvince = async (value) => {
    setProvince(value);
    const locationsFetch = await getLocation(value);
    setLocations(locationsFetch.municipios);
  };

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
    setGeneralData(data);
    if (event.target.name === "province") handleProvince(event.target.value);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);
  return (
    <div>
      <h2 className="text-xl">Titular</h2>
      <div className="grid items-center gap-1.5 px-1">
        <div>
          <Label className="pt-3" htmlFor="ownerName">
            Nombre del titular <span className="text-red-600">*</span>
          </Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="ownerLastName">
            Apellido del titular <span className="text-red-600">*</span>
          </Label>
          <Input
            id="ownerLastName"
            name="ownerLastName"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="ownerIdType">
            Tipo de identificación <span className="text-red-600">*</span>
          </Label>
          <Select
            name="ownerIdType"
            id="ownerIdType"
            required
            onValueChange={(value) =>
              handleChangeInput({ target: { name: "ownerIdType", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tipo " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dni">DNI</SelectItem>
              <SelectItem value="libreta">Libreta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="pt-3" htmlFor="ownerNumberId">
            Numero de identificación <span className="text-red-600">*</span>
          </Label>
          <Input
            id="ownerNumberId"
            name="ownerNumberId"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="ownerAddress">
            Dirección <span className="text-red-600">*</span>
          </Label>
          <Input
            id="ownerAddress"
            type="text"
            name="ownerAddress"
            required
            onChange={handleChangeInput}
          />
        </div>
        <Separator className="w-1/2 my-3 h-1 mx-auto" />
        <h2 className="text-xl">Localización del bien</h2>
        <div className="relative">
          <label
            htmlFor="province"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Provincia<span className="text-red-600">*</span>
          </label>
          <select
            id="province"
            name="province"
            disabled={!provinces}
            onChange={handleChangeInput}
            required
            className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none after:content-['<'] "
          >
            <option value="">Seleccionar localidad</option>
            {provinces &&
              provinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
          </select>
          <ChevronDown className="absolute h-4 w-4 opacity-50 right-4 top-10" />
        </div>
        <div className="relative">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Localidad<span className="text-red-600 ">*</span>
          </label>
          <select
            id="location"
            name="location"
            disabled={!locations}
            onChange={handleChangeInput}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none after:content-['<'] "
          >
            <option value="">Seleccionar localidad</option>
            {locations &&
              locations.map((location) => (
                <option key={location.id} value={location.nombre}>
                  {location.nombre}
                </option>
              ))}
          </select>
          <ChevronDown className="absolute h-4 w-4 opacity-50 right-4 top-10" />
        </div>
        <div>
          <Label className="pt-3" htmlFor="address">
            Dirección
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
