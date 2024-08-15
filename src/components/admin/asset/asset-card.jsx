import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getExtraFieldsByCategory } from "@/lib/server-actions/admin/asset-actions/extra-fields";
import { fontAwesomeIcons, showCardOptions } from "@/lib/utils/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

const AssetCard = async ({ asset }) => {
  const extraFields = await getExtraFieldsByCategory(asset.category);
  const renderFieldShowCard = () => {
    return (
      <>
        {extraFields.map((field) => {
          if (field.showCard === showCardOptions.ALLWAYS.value) {
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
            <Link
              href={`/admin/bien/editar/${asset._id}`}
              className={buttonVariants({ variant: "ghost" })}
            >
              <Pencil />
            </Link>
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
