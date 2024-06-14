// components/Navbar.js
import Link from "next/link";
import { User } from "./user";
import Image from "next/image";

const Navbar = async () => {
  return (
    <nav className="border-r bg-stone-800 block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex md:h-nav h-navMobile items-center border-b px-5 justify-between ">
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
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
