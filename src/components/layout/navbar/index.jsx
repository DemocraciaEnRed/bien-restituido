"use client";
import { useAuthContext } from "@/context/auth-contet";
import { userRoles } from "@/lib/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuthContext();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);
  return (
    <nav className="border-r bg-stone-800 block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex md:h-nav h-navMobile items-center border-b px-5 justify-between ">
          <Link className="flex items-center gap-2 font-semibold " href="/">
            <img src="/logo.png" alt="logo bien restituido" />
          </Link>
          {isClient && user && user.role === userRoles.ADMIN && (
            <Link className="text-white" href="/admin">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
