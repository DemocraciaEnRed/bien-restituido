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
import { getAssetCategory } from "@/lib/server-actions/asset-actions/asset-category";
import CategoryList from "@/components/admin/asset/category-list";

const Asset = async () => {
  const assetCategories = await getAssetCategory();
  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">Categorias de bienes</h1>

      <div className="flex justify-between my-3">
        <span className="w-1/2">
          Acá podes gestionar las categorías de bienes existentes. Podes crear
          nuevas categorías, editar.
        </span>
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "bg-indigo-300",
          })}
          href="/admin/categoria/nuevo"
        >
          Crear Nueva categoría +
        </Link>
      </div>

      <CategoryList categories={assetCategories} />
    </div>
  );
};

export default Asset;
