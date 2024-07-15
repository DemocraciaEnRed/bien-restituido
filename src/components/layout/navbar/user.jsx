import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getSession,
  signOut,
} from "@/lib/server-actions/admin/user/auth-actions";

export async function User() {
  const user = await getSession();

  if (!user) {
    return (
      <Link className="text-white" href="/autenticacion/inicio">
        Iniciar sesion
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "admin" && (
          <DropdownMenuItem>
            <Link href="/admin">
              <Button variant="link">admin</Button>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href="/perfil">
            <Button variant="link">perfil</Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={signOut}>
            <Button variant="link">Cerrar sesion</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
