import Image from "next/image";

import React from "react";

const BannerHome = () => {
  return (
    <header className=" bg-orange-500 ">
      <div className="container flex flex-row min-h-20 relative overflow-hidden ">
        <Image
          src="/escudo.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="escudo"
          className="absolute h-full w-auto -bottom-1/4 -right-1/2 md:-right-1/4 lg:right-[10%] opacity-35"
        />
        <div className="py-16 w-8/12 relative">
          <h1 className="text-4xl font-bold">
            Registro de los bienes cautelados y decomisados del crimen
            organizado en Argentina
          </h1>
          <p className="text-2xl font-extralight pt-3  w-full">
            Herramienta de visualización y monitoreo de los bienes en el país. 
          </p>
        </div>
      </div>
    </header>
  );
};

export default BannerHome;
