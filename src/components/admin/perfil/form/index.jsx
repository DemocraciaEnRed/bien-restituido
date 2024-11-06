"use client";
import { useFormState } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import PasswordForm from "@/components/admin/perfil/form/password-form";

import React from "react";
import { changeUserMeData } from "@/lib/actions/admin/user/post-data";

const ProfileForm = ({ user }) => {
  const [status, action] = useFormState(changeUserMeData);

  return (
    <form action={action}>
      <div className="flex p-3">
        <div className="w-2/4">
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="username">Nombre completo</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre completo"
              defaultValue={user.username}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              defaultValue={user.email}
            />
          </div>
        </div>
        <PasswordForm />
      </div>
      <div className="text-right">
        <Button variant="outline">
          guardar <Save />
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
