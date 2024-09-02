import Image from "next/image";

import React from "react";

const BannerHome = () => {
  return (
    <header className="flex flex-row text-white bg-orange-500 min-h-20 relative overflow-hidden">
      <Image
        src="/escudo.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="escudo"
        className="absolute h-full w-auto -bottom-1/4 -right-1/2 md:-right-1/4 lg:right-[10%] "
      />
      <div className="py-16 px-20 w-full relative z-10 bg-orange-500 bg-opacity-60">
        <h1 className="text-3xl font-bold">Bien Restituido</h1>
        <p className="text-lg font-extralight pt-3 md:w-5/12 w-full">
          Accedé al Registro Nacional y Público de bienes cautelados y
          recuperados del crimen organizado en Argentina.
        </p>
      </div>
    </header>
  );
};

export default BannerHome;
