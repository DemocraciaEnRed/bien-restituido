"use client";
import React, { useState } from "react";

import FormAsset from "@/components/admin/asset/assetForm";

const NewAsset = () => {
  return (
    <>
      <p className="text-lg font-bold">NUEVO BIEN </p>
      <FormAsset />
    </>
  );
};

export default NewAsset;
