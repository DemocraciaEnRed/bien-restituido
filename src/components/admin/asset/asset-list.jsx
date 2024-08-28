import React from "react";
import AssetCard from "./asset-card";
import { getAssets } from "@/lib/server-actions/home/assets";

async function AssetList({ filter = {} }) {
  const assets = await getAssets(filter);

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
