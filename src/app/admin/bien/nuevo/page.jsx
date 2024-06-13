import React from "react";

import { getAssetType } from "@/lib/server-actions/asset-actions/asset-type";
import FormAsset from "@/components/admin/asset/form-asset";
const NewAsset = async () => {
  const assetTypes = await getAssetType();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="z-10 w-full  overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <FormAsset assetTypes={assetTypes} />
      </div>
    </div>
  );
};

export default NewAsset;
