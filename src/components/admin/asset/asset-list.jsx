import { getAssets } from "@/lib/server-actions/asset-actions/asset";
import React from "react";
import AssetCard from "./asset-card";

const AssetList = async () => {
  const assets = await getAssets();
  return (
    <div>
      <h4 className="text-xl my-4">Listado de bienes</h4>
      {assets.map((asset) => (
        <AssetCard asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
