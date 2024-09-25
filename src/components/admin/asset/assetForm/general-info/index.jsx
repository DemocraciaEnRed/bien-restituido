import React, { useEffect, useState } from "react";

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
import { getLocation, getProvinces } from "@/lib/server-actions/admin/location";

import { ChevronDown } from "lucide-react";
import SelectCustom from "@/components/ui/select-custom";

const GeneralInfo = ({ assetEdit }) => {
  const [data, setData] = useState(assetEdit || {});
  const [provinces, setProvinces] = useState(null);
  const [locations, setLocations] = useState(null);

  const fetchProvinces = async () => {
    let provincesFetch = await getProvinces();
    setProvinces(provincesFetch.provincias);
  };

  const handleProvince = async (value) => {
    const locationsFetch = await getLocation(value);
    setLocations(locationsFetch.municipios);
  };

  const handleChangeInput = (event) => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      data[event.target.name] = event.target.value;
      setData({ ...data });
    } else {
      const inputData = {
        [event.target.name]: event.target.value,
      };
      setData(inputData);
    }
    if (event.target.name === "province") handleProvince(event.target.value);
  };

  useEffect(() => {
    fetchProvinces();
    if (assetEdit) handleProvince(assetEdit.province);
  }, []);

  return (
    <div className="grid items-center gap-1.5 px-1">
      <h2 className="text-xl">Titular</h2>
      <div>
        <Label className="pt-3" htmlFor="ownerName">
          Nombre del titular <span className="text-red-600">*</span>
        </Label>
        <Input
          id="ownerName"
          type="text"
          name="ownerName"
          required
          defaultValue={assetEdit && assetEdit.ownerName}
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
          defaultValue={assetEdit && assetEdit.ownerLastName}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <Label className="pt-3" htmlFor="ownerIdType">
          Tipo de identificación <span className="text-red-600">*</span>
        </Label>
        <SelectCustom
          name="ownerIdType"
          id="ownerIdType"
          required
          defaultValue={(assetEdit && assetEdit.ownerIdType) || ""}
          onChange={handleChangeInput}
        >
          <option value="" disabled>
            Seleccionar tipo
          </option>
          <option value="dni">DNI</option>
          <option value="libreta">libreta</option>
        </SelectCustom>
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
          defaultValue={assetEdit && assetEdit.ownerNumberId}
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
          defaultValue={assetEdit && assetEdit.ownerAddress}
          onChange={handleChangeInput}
        />
      </div>
      <Separator className="w-1/2 my-3 h-1 mx-auto" />
      <h2 className="text-xl">Localización del bien</h2>
      {provinces && (
        <div className="relative">
          <label
            htmlFor="province"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Provincia<span className="text-red-600"> *</span>
          </label>
          <SelectCustom
            id="province"
            name="province"
            onChange={handleChangeInput}
            required
            defaultValue={(assetEdit && assetEdit.province) || ""}
          >
            <option value="" disabled>
              Seleccionar localidad
            </option>
            {provinces &&
              provinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
          </SelectCustom>
        </div>
      )}
      {locations && (
        <div className="relative">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Localidad<span className="text-red-600 "> *</span>
          </label>
          <SelectCustom
            id="location"
            name="location"
            onChange={handleChangeInput}
            required
            defaultValue={(assetEdit && assetEdit.location) || ""}
          >
            <option value="" disabled>
              Seleccionar localidad
            </option>
            {locations &&
              locations.map((location) => (
                <option key={location.id} value={location.nombre}>
                  {location.nombre}
                </option>
              ))}
          </SelectCustom>
        </div>
      )}
      <div>
        <Label className="pt-3" htmlFor="address">
          Dirección
        </Label>
        <Input
          id="address"
          name="address"
          type="text"
          defaultValue={assetEdit && assetEdit.address}
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
