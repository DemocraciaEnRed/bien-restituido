import React from "react";
import AssetCard from "./asset-card";
import { getAssets } from "@/lib/server-actions/home/fetch-data";
import AssetPagination from "@/components/asset-pagination";

async function AssetList({ filter = {} }) {
  const { assets, page, total, pages, nextPage, prevPage, status, message } =
    await getAssets(filter);

  return (
    <div>
      <h4 className="text-xl my-4">Listado de bienes</h4>
      {status === 200 ? (
        assets.length ? (
          assets.map((asset) => <AssetCard key={asset._id} asset={asset} />)
        ) : (
          <p>Todavía no hay bienes en esta sección</p>
        )
      ) : (
        <p className="first-letter:uppercase">{message}</p>
      )}
      <AssetPagination
        page={page}
        total={total}
        pages={pages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}

export default AssetList;
