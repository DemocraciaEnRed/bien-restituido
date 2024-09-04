import React, { Suspense } from "react";

import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
import { LoaderCircle } from "lucide-react";
const Asset = ({ searchParams }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mr-5 mb-5">Bienes archivados</h1>
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
            archivedAt: true,
            search: searchParams.search,
          }}
        />
      </Suspense>
    </div>
  );
};

export default Asset;
