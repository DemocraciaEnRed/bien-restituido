// components/Navbar.js
import Link from "next/link";
import { userMe } from "@/lib/server-actions/auth-actions";
import { User } from "./user";

const Navbar = async () => {
  const user = await userMe();

  return (
    <nav className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-5 justify-between">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="">BIEN-RESTITUIDO</span>
          </Link>
          <User user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
