"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { verifiedUser } from "@/lib/server-actions/admin/user/post-data";
import { Check, Pen, Trash, X } from "lucide-react";
import Link from "next/link";

function UserTable({ users }) {
  return (
    <Table>
      <TableCaption>Lista de usuarios registrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead className="text-right">Verificado</TableHead>
          {/* <TableHead className="text-right">Acciones</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">
              <Link href={`/admin/usuarios/${user._id}`}>{user.username}</Link>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="flex justify-end">
              {user.isVerified ? <Check color="green" /> : <X color="red" />}
            </TableCell>
            {/*  <TableCell className="flex justify-end">
              <Link
                href={`/admin/usuarios/editar/${user._id}`}
                className="mx-3 flex justify-center items-center"
              >
                <Pen />
              </Link>
              <Button variant="gost" className="p-0 mx-3">
                <Trash color="red" />
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;
