import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
const Asset = ({ searchParams }) => {
  return (
    <div>
      <div className="flex flex-row mb-5">
        <h1 className="text-3xl font-bold mr-5">Buscador de bienes</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/admin/bien/nuevo"
        >
          Nuevo bien +
        </Link>
      </div>
      <AssetSerch />

      <AssetList filter={{ archivedAt: null, search: searchParams.search }} />
    </div>
  );
};

export default Asset;
