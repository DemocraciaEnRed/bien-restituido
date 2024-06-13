import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getAssetType } from "@/lib/server-actions/asset-actions/asset-type";

const Asset = async () => {
  const assetTypes = await getAssetType();
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl">Tipos de bien</h1>
      </div>

      <h4 className="text-xl">lista de tipos de bienes</h4>
      {/* TODO */}
      <Table>
        <TableCaption>lista de tipos de bienes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>

            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetTypes &&
            assetTypes.map((type) => (
              <TableRow key={type._id}>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href=""
                    className={buttonVariants({
                      variant: "outline",
                      className: "mx-1",
                    })}
                  >
                    Ver
                  </Link>
                  <Link
                    href=""
                    className={buttonVariants({
                      variant: "outline",
                      className: "mx-1",
                    })}
                  >
                    Editar
                  </Link>
                  <Link
                    href=""
                    className={buttonVariants({
                      variant: "outline",
                      className: "mx-1",
                    })}
                  >
                    Borrar
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/admin/tipo-bien/nuevo"
      >
        Nuevo tipo de bien
      </Link>
    </div>
  );
};

export default Asset;
