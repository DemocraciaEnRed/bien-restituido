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
      <footer className=" bg-orange-600 pb-10">
        <div className=" bg-orange-500">
          <div className="container min-h-20 py-3  px-4">
            <div className="py-4 relative z-10 bg-orange-500 bg-opacity-60">
              <h1 className="text-2xl text-white font-bold">
                Proyecto Bien Restituido
              </h1>
              <br />
              <p className="text-xl font-light">
                Para el desmantelamiento patrimonial del crimen organizado y el
                fortalecimiento de la sociedad civil.
              </p>
              <p className="text-base font-light pt-3 ">
                <br />
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
          </div>
        </div>
        <div className="flex justify-center items-center flex-col py-8 bg-white">
          <div className="flex justify-evenly w-full">
            <Image
              src={`/logos_orgs/libera.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo libera"
            />
            <Image
              src={`/logos_orgs/multipolar.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo multipolar"
            />
            <Image
              src={`/logos_orgs/acij.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo acij"
            />
            <Image
              src={`/logos_orgs/circolo.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo circolo"
            />
          </div>
          <div className="flex mt-10 justify-center w-full">
            <Image
              src={`/logos_orgs/union_europea.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo union europea"
            />
            <Image
              src={`/logos_orgs/der.jpg`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-24"
              alt="logo der"
            />
          </div>
        </div>
      </footer>
    );
};

export default Footer;
