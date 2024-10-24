import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";
import { deleteSession } from "@/lib/utils/sessions";
import { redirect } from "next/navigation";

export async function UserInfo({ user }) {
  const logout = async () => {
    "use server";
    await deleteSession();
    redirect("/");
  };

  if (!user) {
    return (
      <Link className="text-white" href="/autenticacion/inicio">
        Iniciar sesion
      </Link>
    );
  }
  return (
    <div className="flex justify-start items-center gap-4 pl-8">
      <Avatar>
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <p>
        <span className="font-bold text-lg">{user.username}</span>
        <br />
        <span className="text-sm text-gray-400 italic">{user.role}</span>
      </p>
    </div>
  );
}
