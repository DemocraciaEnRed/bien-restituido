import React from "react";

import FormAsset from "@/components/admin/asset/assetForm";
import { getAssetById } from "@/lib/server-actions/admin/asset-actions/asset";

const EditAsset = async ({ params: { id } }) => {
  const asset = await getAssetById(id);

  return (
    <>
      <p className="text-lg font-bold">BIEN </p>
      <FormAsset assetEdit={asset} />
    </>
  );
};

export default EditAsset;
