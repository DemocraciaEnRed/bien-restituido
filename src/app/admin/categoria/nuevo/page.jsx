"use client";
import React, { useState } from "react";

import CategoryForm from "@/components/admin/asset/category-form";

const NewAssetCategory = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">Nuevo tipo de bien</h1>

      <div className="flex justify-between my-3">
        <span className="w-1/2">
          Acá podes crear una nueva entidad de bien (enfocado en su subtipo).
          Una vez creado el mismo será elegible al momento de cargar un nuevo
          tipo de bien.
        </span>
      </div>
      <CategoryForm />
    </div>
  );
};

export default NewAssetCategory;
