import { getAssets } from "@/lib/server-actions/admin/asset-actions/asset";
import React from "react";
import AssetCard from "./asset-card";

const AssetList = async () => {
  try {
    const assets = await getAssets();
    return (
      <div>
        <h4 className="text-xl my-4">Listado de bienes</h4>
        {assets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} />
        ))}
      </div>
    );
  } catch (error) {
    return <div>{error}</div>;
  }
};

export default AssetList;
