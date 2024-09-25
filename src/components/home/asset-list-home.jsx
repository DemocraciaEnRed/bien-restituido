import { getAssets } from "@/lib/server-actions/home/fetch-data";
import React from "react";
import AssetCard from "./asset-card";
import AssetPagination from "../asset-pagination";

const AssetListHome = async ({ filter }) => {
  const { assets, page, total, pages, nextPage, prevPage } = await getAssets(
    filter
  );

  return (
    <div>
      {assets.length ? (
        assets.map((asset) => <AssetCard asset={asset} key={asset._id} />)
      ) : (
        <p>Todavía no hay bienes en esta sección</p>
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
};

export default AssetListHome;
