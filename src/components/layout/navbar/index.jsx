// components/Navbar.js
import Link from "next/link";
import { User } from "./user";

const Navbar = async () => {
  return (
    <nav className="border-r bg-stone-800 block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex md:h-nav h-navMobile items-center border-b px-5 justify-between ">
          <Link className="flex items-center gap-2 font-semibold " href="/">
            <img src="/logo.png" alt="logo bien restituido" />
          </Link>
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
