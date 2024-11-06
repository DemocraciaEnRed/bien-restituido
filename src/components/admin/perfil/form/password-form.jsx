"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const PasswordForm = () => {
  const [modify, setModify] = useState(false);
  return (
    <div className="w-2/4 flex">
      {modify && (
        <div className="flex-1">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="currentPassword">Contraseña actual</Label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              required
              placeholder="Contraseña actual"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="newPassword">Contraseña</Label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              placeholder="Contraseña"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="confirmPassword">Reingresar Contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Reingresar Contraseña"
            />
          </div>
        </div>
      )}
      <Button type="button" onClick={() => setModify(!modify)}>
        {!modify ? "Editar contraseña" : "Cancelar"}
      </Button>
    </div>
  );
};

export default PasswordForm;
