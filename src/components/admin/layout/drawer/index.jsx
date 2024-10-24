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

import { deleteSession, verifySession } from "@/lib/utils/sessions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { userRoles } from "@/lib/utils/constants";

async function Drawer() {
  const user = await verifySession();

  const logout = async () => {
    "use server";
    await deleteSession();
    redirect("/");
  };

  return (
    <aside className="flex flex-col w-64 min-h-full overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
      <div className="flex flex-col flex-1 pt-6 gap-8 h-[calc(100vh_-_theme(height.nav))] fixed ">
        <ul className="flex flex-col gap-4">
          <UserInfo user={user} />
        </ul>
        <ul className="flex flex-col gap-4">
          <BienesDrawerItem />
        </ul>

        <>
          <hr />
          <ul className="flex flex-col gap-4">
            {[
              {
                url: "/configuracion",
                icon: <Settings />,
                text: "Configuración",
                role: [userRoles.ADMIN],
              },
              {
                url: "/perfil",
                icon: <User />,
                text: "Perfil",
                role: [userRoles.ADMIN, userRoles.GESTOR],
              },
              {
                url: "/usuarios",
                icon: <Users />,
                text: "Usuarios",
                role: [userRoles.ADMIN],
              },
            ].map(
              (item) =>
                item.role.includes(user.role) && (
                  <DrawerItem
                    key={item.url}
                    url={item.url}
                    text={item.text}
                    icon={item.icon}
                  />
                )
            )}
          </ul>
        </>
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
