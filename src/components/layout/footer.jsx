"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const logos = [
  "libera.jpg",
  "multipolar.jpg",
  "acij.jpg",
  "circolo.jpg",
  "union_europea.jpg",
  "der.jpg",
];

const Footer = () => {
  const pathname = usePathname();
  const noFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/autenticacion");
  if (!noFooter)
    return (
      <footer className=" bg-white ">
        <div className=" bg-orange-500">
          <div className="container flex flex-row  min-h-20 py-3 ">
            <div className="py-16  w-7/12 relative z-10 bg-orange-500 bg-opacity-60">
              <h1 className="text-2xl ">
                Proyecto Bien Restituido. Para el desmantelamiento patrimonial
                del crimen organizado y el fortalecimiento de la sociedad civil.
              </h1>
              <br />
              <p className="text-lg font-light pt-3 ">
                Proyecto Bien Restituido. Para el desmantelamiento patrimonial
                del crimen organizado y el fortalecimiento de la sociedad civil.
                <br />
                Nuestro objetivo es lograr un nuevo marco normativo para
                recuperar los bienes provenientes del delito y que su destino
                sea el fortalecimiento de las organizaciones sociales y
                comunitarias que se dedican a atender las necesidades de los
                grupos más vulnerabilizados de nuestro país.
                <br />
                <br />
                Para conocer más del proyecto ingresá a{" "}
                <Link href="https://bienrestituido.org.ar/" target="_blank">
                  https://bienrestituido.org.ar/
                </Link>
              </p>
            </div>
            <div className="w-5/12 flex justify-center items-center">
              <Image
                src="/escudo.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="escudo"
                className="w-2/3 opacity-35"
              />
            </div>
          </div>
        </div>
        <div className=" containet flex justify-center items-center flex-col my-10">
          <div className="flex justify-evenly w-3/4">
            <Image
              src={`/logos_orgs/libera.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
            <Image
              src={`/logos_orgs/multipolar.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
            <Image
              src={`/logos_orgs/acij.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
            <Image
              src={`/logos_orgs/circolo.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
          </div>
          <div className="flex mt-10 justify-center w-3/4">
            <Image
              src={`/logos_orgs/union_europea.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
            <Image
              src={`/logos_orgs/der.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
            />
          </div>
        </div>
      </footer>
    );
};

export default Footer;
