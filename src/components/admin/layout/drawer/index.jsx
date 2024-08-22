import React from "react";
import DrawerItem from "./drawerItem";
import {
  Settings,
  User,
  Users,
  LogOut
} from "lucide-react";
import { UserInfo } from "./userInfo";
import BienesDrawerItem from "./bienesDrawerItem";

import { deleteSession } from "@/lib/utils/sessions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


async function Drawer() {

  const logout = async () => {
    "use server";
    await deleteSession();
    redirect("/");
  };

  return (
    <aside className="flex flex-col w-64 min-h-full overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
      <div className="flex flex-col flex-1 pt-6 gap-8 h-[calc(100vh_-_theme(height.nav))] fixed ">
        <ul className="flex flex-col gap-4">
          <UserInfo />
        </ul>
        <ul className="flex flex-col gap-4">
          <BienesDrawerItem />
        </ul>
        <hr />
        <ul className="flex flex-col gap-4">
          {[
            {
              url: "/configuracion",
              icon: <Settings />,
              text: "Configuración",
            },
            { url: "/perfil", icon: <User />, text: "Perfil" },
            { url: "/usuarios", icon: <Users />, text: "Usuarios" },
          ].map((item) => (
            <DrawerItem
              key={item.url}
              url={item.url}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </ul>
        <ul className="flex flex-col justify-end h-full pb-3">
          <form action={logout}>
            <Button
              className="w-full gap-1.5 text-muted-foreground"
              variant="ghost"
            >
              <LogOut /> Cerrar sesión
            </Button>
          </form>
        </ul>
      </div>
    </aside>
  );
}

export default Drawer;
