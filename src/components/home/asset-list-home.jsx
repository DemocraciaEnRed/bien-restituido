import { getAssets } from "@/lib/actions/home/fetch-data";
import React from "react";
import AssetCard from "./asset-card";
import AssetPagination from "../asset-pagination";

const AssetListHome = async ({ filter }) => {
  const { assets, page, total, pages, nextPage, prevPage, status, message } =
    await getAssets(filter);

  if (status === 200)
    return (
      <div className="my-10">
        {assets && assets.length ? (
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
  else
    return (
      <div className="my-10">
        <p>{message}</p>
      </div>
    );
};

export default AssetListHome;
