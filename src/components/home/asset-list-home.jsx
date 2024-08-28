import { getAssets } from "@/lib/server-actions/home/assets";
import React from "react";
import AssetCard from "./asset-card";

const AssetListHome = async ({ searchParams }) => {
  const assets = await getAssets({ search: searchParams });

  return (
    <div>
      {assets &&
        assets.map((asset) => <AssetCard asset={asset} key={asset._id} />)}
    </div>
  );
};

export default AssetListHome;
