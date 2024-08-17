'use client'
// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const adminPath = pathname.startsWith("/admin");
  return (
    <nav
      className={`block ${
        adminPath ? "bg-stone-800 fixed w-full z-10" : "bg-white"
      }`}
    >
      <div
        className={`flex h-full max-h-screen flex-col gap-2 ${
          !adminPath && "container"
        }`}
      >
        <div
          className={`flex items-center border-b px-5 justify-between ${
            adminPath && "md:h-nav h-navMobile"
          }`}
        >
          <Link href="/" className="is-flex is-align-items-center">
            {adminPath ? (
              <Image
                width={0}
                height={0}
                className="w-48"
                sizes="100vw"
                src="/logo.png"
                alt="logo resurgentes"
              />
            ) : (
              <Image
                width={0}
                height={0}
                className="w-48"
                sizes="100vw"
                src="/logo-agencia.png"
                alt="logo agencia bien restituido"
              />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
