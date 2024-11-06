import React from "react";
import { verifySession } from "@/lib/utils/sessions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ProfileForm from "@/components/admin/perfil/form";

const Asset = async () => {
  const user = await verifySession();
  

  return (
    <div>
      <h1 className="text-3xl font-bold mr-5 mb-5">Información de perfil</h1>
      <Card>
        <CardHeader>
          <CardDescription>Mi Perfil </CardDescription>
          <CardTitle className="capitalize">{user.username} </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-6">
          <h6>Acá podés actualizar tus datos y completar tu perfil</h6>
          <ProfileForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Asset;
