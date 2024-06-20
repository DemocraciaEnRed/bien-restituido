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
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
const AssetCategory = () => {
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

export default AssetCategory;