import React from "react";
import DrawerItem from "./drawerItem";
import {
  Settings,
  User,
  Users,
} from "lucide-react";
import { UserInfo } from "./userInfo";
import BienesDrawerItem from "./bienesDrawerItem";


const settingDrawerList = [
  { url: "/configuracion", icon: <Settings />, text: "Configuración" },
  { url: "/perfil", icon: <User />, text: "Perfil" },
  { url: "/usuarios", icon: <Users />, text: "Usuarios" },
];

async function Drawer() {

  return (
    <aside
      className={`flex flex-col w-64 min-h-[calc(100vh_-_theme(height.nav))] overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}
    >
      <div className="flex flex-col flex-1 mt-6 gap-8">
        <ul className="flex flex-col gap-4">
          <UserInfo />
        </ul>
        <ul className="flex flex-col gap-4">
          <BienesDrawerItem />
        </ul>
        <hr />        
        <ul className="flex flex-col gap-4">
          {settingDrawerList.map((item) => (
            <DrawerItem
              key={item.url}
              url={item.url}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Drawer;
