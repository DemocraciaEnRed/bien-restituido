import React from "react";
import CategoryForm from "@/components/admin/category/category-form";
import { getCategoryBySlug } from "@/lib/server-actions/admin/asset-actions/category";
import { getSubCategoriesByCategory } from "@/lib/server-actions/admin/asset-actions/sub-category";
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";

const EditCategory = async ({ params: { slug } }) => {
  const category = await getCategoryBySlug(slug);
  const subCategories = await getSubCategoriesByCategory(category);
  const extraFields = await getExtraFieldsByCategory(category);
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
      <CategoryForm
        categoryEdit={category}
        subCategoriesEdit={subCategories}
        extraFields={extraFields}
      />
    </div>
  );
};

export default EditCategory;
