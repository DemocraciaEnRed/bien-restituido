import React from "react";

import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetList from "@/components/admin/asset/asset-list";
const Asset = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mr-5 mb-5">Bienes archivados</h1>
      <AssetSerch />
      <AssetList filter={{ archivedAt: { $ne: null } }} />
    </div>
  );
};

export default Asset;
