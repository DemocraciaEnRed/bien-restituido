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
import { getCategories } from "@/lib/server-actions/admin/asset-actions/category";
import CategoryList from "@/components/admin/category/category-list";

const Asset = async () => {
  const Categories = await getCategories();
  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">Categorias de bienes</h1>

      <div className="flex justify-between my-3">
        <span className="w-1/2">
          Acá podes gestionar las categorías de bienes existentes. Podes crear
          nuevas categorías, editar.
        </span>
        <Link
          className={
            buttonVariants({ variant: "outline" }) +
            "border-primary text-primary hover:bg-primary hover:text-white"
          }
          href="/admin/categoria/nuevo"
        >
          Crear Nueva categoría +
        </Link>
      </div>

      <CategoryList categories={Categories} />
    </div>
  );
};

export default Asset;
