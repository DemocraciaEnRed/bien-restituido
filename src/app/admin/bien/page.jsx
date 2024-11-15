import React, { Suspense } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
import DownloadButton from "@/components/admin/asset/download-button";
import { LoaderCircle } from "lucide-react";
import { userMe } from "@/lib/actions/authentication/auth-actions";
import { getCategories } from "@/lib/actions/home/fetch-data";
const Asset = async ({ searchParams: { search, page, categoria } }) => {
  const Categories = await getCategories();
  const category = categoria
    ? Categories.find((category) => category.slug === categoria)._id
    : null;
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
          <DownloadButton filter={{ archivedAt: null, search: search }} />
        </div>
      </div>
      <Suspense
        fallback={
          <div>
            <LoaderCircle className="animate-spin inline" /> Cargando...
          </div>
        }
      >
        <AssetSerch categories={Categories} />
        <AssetList
          filter={{
            archivedAt: null,
            search: search,
            page: page || 1,
            limit: 20,
            category,
          }}
        />
      </Suspense>
    </div>
  );
};

export default Asset;
