import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
const Asset = () => {
  return (
    <div>
      <AssetSerch />

      <AssetList />
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/admin/bien/nuevo"
      >
        Nuevo bien
      </Link>
    </div>
  );
};

export default Asset;
