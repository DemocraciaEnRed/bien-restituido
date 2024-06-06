import React from "react";
import DrawerItem from "./drawerItem";

const drawerList = [{ url: "usuarios", text: "Usuario" }];

function Drawer() {
  return (
    <aside
      className={`flex flex-col w-64 min-h-[calc(100vh_-_theme(height.nav))] px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}
    >
      <div className="flex flex-col justify-between flex-1 mt-6">
        <ul>
          {drawerList.map((item) => (
            <DrawerItem key={item.url} url={item.url} text={item.text} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Drawer;
