'use client'
// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const adminPath = pathname.startsWith("/admin");
  return (
    <nav className={`block bg-stone-950 fixed w-full z-10 top-0`}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex items-center  px-5 justify-between md:h-nav h-navMobile">
          <Link href="/" className="is-flex is-align-items-center">
            <Image
              width={0}
              height={0}
              className="w-48"
              sizes="100vw"
              src="/logo.png"
              alt="logo resurgentes"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
