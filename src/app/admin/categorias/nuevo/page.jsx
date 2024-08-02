import React from "react";

import CategoryForm from "@/components/admin/category/category-form";

const NewCategory = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold uppercase">Nuevo tipo de bien</h1>

      <div className="flex justify-between my-3">
        <span className="w-2/3">
          Acá podes crear una nueva entidad de bien (enfocado en su subtipo).
          Una vez creado el mismo será elegible al momento de cargar un nuevo
          tipo de bien.
        </span>
      </div>
      <CategoryForm />
    </div>
  );
};

export default NewCategory;
