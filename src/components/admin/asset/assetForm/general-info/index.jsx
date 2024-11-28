import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getCountries,
  getLocation,
  getProvinces,
} from "@/lib/actions/admin/location";

import SelectCustom from "@/components/ui/select-custom";
import BigSkeleton from "../big-skeleton";
import Titular from "./titular";

const GeneralInfo = ({ assetEdit }) => {
  const [data, setData] = useState(assetEdit || {});
  const [provinces, setProvinces] = useState(null);
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCountry = (value) => {
    setCountry(value);
    if (value === "Argentina") fetchProvinces();
  };

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
    if (event.target.name === "country") handleCountry(event.target.value);
    if (event.target.name === "province") handleProvince(event.target.value);
  };

  const LoadStep = async () => {
    setLoading(true);
    const countries = await getCountries();
    setCountries(countries);
    if (assetEdit) {
      handleCountry(assetEdit.country);
      await handleProvince(assetEdit.province);
      setCountry(assetEdit.country);
    }
    setLoading(false);
  };

  useEffect(() => {
    LoadStep();
  }, []);

  if (!loading)
    return (
      <div className="grid items-center gap-1.5 px-1">
        <Titular assetEdit={assetEdit} />
        <Separator className="w-1/2 my-3 h-1 mx-auto" />
        <h2 className="text-xl">Localización del bien</h2>
        {countries && (
          <div className="relative">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pais<span className="text-red-600"> *</span>
            </label>
            <SelectCustom
              id="country"
              name="country"
              onChange={handleChangeInput}
              required
              defaultValue={(assetEdit && assetEdit.country) || ""}
            >
              <option value="" disabled>
                Seleccionar pais
              </option>
              {countries &&
                countries.map((country) => (
                  <option
                    key={country.cca3}
                    value={country.translations.spa.common}
                  >
                    {country.translations.spa.common}
                  </option>
                ))}
            </SelectCustom>
          </div>
        )}
        {country === "Argentina" && provinces && (
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
        {country === "Argentina" && locations && (
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
        {country && (
          <div>
            <Label className="pt-3" htmlFor="address">
              Dirección
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              required={country !== "Argentina"}
              defaultValue={assetEdit && assetEdit.address}
              onChange={handleChangeInput}
            />
          </div>
        )}
      </div>
    );
  else return <BigSkeleton />;
};

export default GeneralInfo;
