import React from "react";
import { getAssets } from "@/lib/server-actions/admin/asset-actions/asset";
import AssetCard from "./asset-card";

async function AssetList() {
  const assets = await getAssets();

  return (
    <div>
      <h4 className="text-xl my-4">Listado de bienes</h4>
      {assets.length ? (
        assets.map((asset) => <AssetCard key={asset._id} asset={asset} />)
      ) : (
        <p>Todavía no hay bienes en esta sección</p>
      )}
    </div>
  );
}

export default AssetList;
