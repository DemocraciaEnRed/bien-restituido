import React from "react";
import { verifySession } from "@/lib/utils/sessions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Asset = async () => {
  const user = await verifySession();
  return (
    <div>
      <h1 className="text-3xl font-bold mr-5 mb-5">Información de perfil</h1>
      <Card>
        <CardHeader>
          <CardDescription>Mi Perfil </CardDescription>
          <CardTitle>{user.username} </CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>      
      </Card>
    </div>
  );
};

export default Asset;
