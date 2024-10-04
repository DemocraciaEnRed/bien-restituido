import React from "react";

import FormAsset from "@/components/admin/asset/assetForm";
import { getAssetById } from "@/lib/actions/home/fetch-data";

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
