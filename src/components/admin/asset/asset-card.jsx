import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";
import { fontAwesomeIcons, showCardOptions } from "@/lib/utils/constants";
import { Button } from "@/components/ui/button";

const AssetCard = async ({ asset }) => {
  const extraFields = await getExtraFieldsByCategory(asset.category);
  const renderFieldShowCard = () => {
    return (
      <>
        {extraFields.map((field) => {
          if (field.showCard === showCardOptions.ALLWAYS) {
            return (
              <span key={field._id}>
                <span className="font-bold">{field.name}</span>:
                {asset.extras[field.slug]}
              </span>
            );
          }
        })}
      </>
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
          <CardDescription>
            #{asset.subCategory?.name},{renderFieldShowCard()}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button variant="link">Ver menos</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AssetCard;
