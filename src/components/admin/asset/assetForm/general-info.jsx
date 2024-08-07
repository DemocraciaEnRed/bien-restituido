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
          <Label className="pt-3" htmlFor="name">
            Nombre del titular <span className="text-red-600">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="ownerName"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="last-name">
            Apellido del titular <span className="text-red-600">*</span>
          </Label>
          <Input
            id="last-name"
            name="ownerLastName"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="id-type">
            Tipo de identificación <span className="text-red-600">*</span>
          </Label>
          <Select
            name="ownerIdType"
            id="id-type"
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
          <Label className="pt-3" htmlFor="dni">
            Numero de identificación <span className="text-red-600">*</span>
          </Label>
          <Input
            id="dni"
            name="ownerDni"
            type="text"
            required
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label className="pt-3" htmlFor="owner-address">
            Dirección <span className="text-red-600">*</span>
          </Label>
          <Input
            id="owner-address"
            type="text"
            name="ownerAddress"
            required
            onChange={handleChangeInput}
          />
        </div>
        <Separator className="w-1/2 my-3 h-1 mx-auto" />
        <h2 className="text-xl">Localización del bien</h2>
        <div>
          <Label className="pt-3" htmlFor="asset-province">
            Provincia<span className="text-red-600">*</span>
          </Label>
          <Select
            name="province"
            id="asset-province"
            required
            onValueChange={(value) =>
              handleChangeInput({ target: { name: "province", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar provincia " />
            </SelectTrigger>
            <SelectContent>
              {provinces &&
                provinces.map((province) => (
                  <SelectItem key={province.id} value={province.nombre}>
                    {province.nombre}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="pt-3" htmlFor="asset-location">
            Localidad<span className="text-red-600">*</span>
          </Label>
          <Select
            name="location"
            id="asset-location"
            required
            disabled={!locations}
            onValueChange={(value) =>
              handleChangeInput({ target: { name: "location", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar localidad" />
            </SelectTrigger>
            <SelectContent>
              {locations &&
                locations.map((location) => (
                  <SelectItem key={location.id} value={location.nombre}>
                    {location.nombre}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="pt-3" htmlFor="asset-address">
            Dirección
          </Label>
          <Input
            id="asset-address"
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
