import React, { Suspense } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
import DownloadButton from "@/components/admin/asset/download-button";
import { LoaderCircle } from "lucide-react";
import { userMe } from "@/lib/actions/authentication/auth-actions";
const Asset = ({ searchParams }) => {
  return (
    <div>
      <div className="flex flex-row mb-5 justify-between">
        <h1 className="text-3xl font-bold">Buscador de bienes</h1>
        <div className="flex gap-3">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/admin/bien/nuevo"
          >
            Nuevo bien +
          </Link>
          <DownloadButton
            filter={{ archivedAt: null, search: searchParams.search }}
          />
        </div>
      </div>
      <Suspense
        fallback={
          <div>
            <LoaderCircle className="animate-spin inline" /> Cargando...
          </div>
        }
      >
        <AssetSerch />
        <AssetList
          filter={{
            archivedAt: null,
            search: searchParams.search,
            page: searchParams.page || 1,
            limit: 20,
          }}
        />
      </Suspense>
    </div>
  );
};

export default Asset;
