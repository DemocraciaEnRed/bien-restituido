import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const destinationStatus = [
  { value: "pending", name: "A reutilizar" },
  { value: "completed", name: "Reutilizado" },
];

const Reuse = () => {
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
                name="destination.status"
                className="hidden"
                id={status.value}
                value={status.value}
                required
                onChange={handleChangeInput}
              />
              <label
                htmlFor={status.value}
                className={`border-2 rounded-md p-3 cursor-pointer border-slate-300 text-slate-600 ${
                  data && data["destination.status"] === status.value
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
      {data && data["destination.status"] === "completed" && (
        <div>
          <div>
            <Label className="pt-3" htmlFor="destinationInfo.agency">
              Organismo/organización<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.agency"
              name="destinationInfo.agency"
              type="text"
              placeholder="Nombre del organismo u organización"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Label className="pt-3" htmlFor="destinationInfo.agencyCuil">
              CUIL<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.agencyCuil"
              name="destinationInfo.agencyCuil"
              type="text"
              placeholder="CUIL"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Label className="pt-3" htmlFor="destinationInfo.project">
              Proyecto<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.project"
              name="destinationInfo.project"
              type="texto"
              placeholder="Nombre del Proyecto"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Label className="pt-3" htmlFor="destinationInfo.assignmentNumber">
              Numero de asignación<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.assignmentNumber"
              name="destinationInfo.assignmentNumber"
              type="text"
              placeholder="Numero del proyecto"
              required
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <div className="relative">
              <Label className="pt-3" htmlFor="destinationInfo.assignmentDate">
                Fecha de asignación<span className="text-red-600">*</span>
              </Label>
              <Input
                id="destinationInfo.assignmentDate"
                name="destinationInfo.assignmentDate"
                type="date"
                required
                className="block"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <div>
            <Label className="pt-3" htmlFor="destinationInfo.expiredDate">
              Fecha de vencimiento<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.expiredDate"
              name="destinationInfo.expiredDate"
              type="date"
              required
              className="block"
              onChange={handleChangeInput}
            />
          </div>

          <div>
            <Label className="pt-3" htmlFor="destinationInfo.followManager">
              Responsable del Seguimiento<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.followManager"
              name="destinationInfo.followManager"
              type="text"
              required
              placeholder="Nombre y apellido del responsable"
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Label className="pt-3">
              Contacto del seguimiento<span className="text-red-600">*</span>
            </Label>
            <Input
              id="destinationInfo.followContactPhone"
              name="destinationInfo.followContactPhone"
              type="text"
              placeholder="Numero de teléfono"
              className="mb-2"
              required
              onChange={handleChangeInput}
            />
            <Input
              id="destinationInfo.followContactEmail"
              name="destinationInfo.followContactEmail"
              type="email"
              placeholder="Correo electronico"
              required
              onChange={handleChangeInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reuse;
