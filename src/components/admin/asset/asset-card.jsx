'use client'
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";
import { fontAwesomeIcons, showCardOptions } from "@/lib/utils/constants";
import { Button } from "@/components/ui/button";

const AssetCard = async ({ asset }) => {
  const [showMore, setShowMore] = useState(false)
  const extraFields = await getExtraFieldsByCategory(asset.category);
  const renderFieldShowCard = () => {
    return (
      <span>
        {extraFields.map((field) => {
          if (field.showCard === showCardOptions.ALLWAYS.value) {
            return (
              <span key={field._id} className="ml-3">
                <span className="font-bold">{field.name}</span>: {asset.extras[field.slug]}
              </span>
            );
          }
        })}
      </span>
    );
  };
  return (
    <Card
      className="flex border-y-0 border-r-0 border-l-8 my-4"
      style={{ borderColor: asset.subCategory?.color }}
    >
      <div className="p-6 flex items-center">
        <div className="bg-slate-100 p-5">
          {
            fontAwesomeIcons.find(
              (icon) => icon.name === asset.subCategory?.icon
            )?.icon
          }
        </div>
      </div>
      <div>
        <CardHeader>
          <CardContent>
            <div><span className="font-bold">{asset.category.name}:</span> {asset.subCategory?.name} {renderFieldShowCard()}</div>
            <div className="mt-2">
              {asset.confiscated && <span className="bg-gray-200 rounded-lg p-2 font-sm">Decomisado</span>}
              {asset.destination && <span className="bg-red-300 rounded-lg p-2 font-sm ml-2">{asset.destination}</span>}
            </div>
            
            <div className={`${!showMore && "hidden" }`}>
              <hr />
              Hola!
            </div>
          </CardContent>
        </CardHeader>
        {/* <CardFooter>
          <Button onClick={() => setShowMore(!showMore)} variant="link">"{showMore?"Ver menos":"Ver más"}"</Button>
        </CardFooter> */}
      </div>
    </Card>
  );
};

export default AssetCard;
