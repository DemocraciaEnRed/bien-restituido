import React from "react";

import FormAsset from "@/components/admin/asset/form-asset";
import { getAssetCategory } from "@/lib/server-actions/asset-actions/asset-category";
const NewAsset = async () => {
  const assetCategories = await getAssetCategory();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="z-10 w-full  overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <FormAsset assetCategories={assetCategories} />
      </div>
    </div>
  );
};

export default NewAsset;
