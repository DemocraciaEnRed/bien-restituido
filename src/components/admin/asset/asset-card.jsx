'use client'
import React, { useEffect, useState } from "react";
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
import { Pencil, Archive } from "lucide-react";
import Link from "next/link";
import { archiveAsset } from "@/lib/server-actions/admin/asset-actions/asset";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const AssetCard = ({ asset }) => {
  const [showMore, setShowMore] = useState(false);
  const [extraFields, setExtraFields] = useState([]);
  const { toast } = useToast();

  const getFIelds = async () => {
    const fields = await getExtraFieldsByCategory(asset.category);
    setExtraFields(fields);
  };

  useEffect(() => {
    getFIelds();
  }, []);

  const renderFieldShowCard = (fields, ordering) => {
    return (
      <span>
        {fields.map((field) => {
          return (
            <span key={field._id} className={`mx-2 ${ordering}`}>
              <span className="font-bold">{field.name}</span>:
              {asset.extras[field.slug]}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <Card
      className="border-y-0 border-r-0 border-l-8 my-4 w-full"
      style={{ borderColor: asset.subCategory?.color }}
    >
      <CardHeader className="flex flex-row w-full justify-between">
        <div className="flex items-center">
          <div className="bg-slate-100 p-4">
            {
              fontAwesomeIcons.find(
                (icon) => icon.name === asset.subCategory?.icon
              )?.icon
            }
          </div>
          <div className="flex flex-col p-2">
            <div>
              <span className="mr-2">
                <span className="font-bold">{asset.category.name}:</span>{" "}
                {asset.subCategory?.name}
              </span>
              {renderFieldShowCard(
                extraFields.filter(
                  (field) => field.showCard === showCardOptions.ALLWAYS.value
                ),
                ""
              )}
            </div>
            <div>
              <div className="mt-2 flex gap-2">
                {asset.confiscated && (
                  <span className="bg-gray-200 rounded-lg p-2 text-xs">
                    Decomisado
                  </span>
                )}
                {asset.destinationInfo && asset.destinationInfo.status && (
                  <span className="bg-pink-200 rounded-lg p-2 text-xs">
                    {
                      {
                        auction: {
                          pending: "A subastar",
                          completed: "Subastado",
                        },
                        reuse: {
                          pending: "A reutilizar",
                          completed: "Reutilizado",
                        },
                      }[asset.destination][asset.destinationInfo.status]
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Link
            href={`/admin/bien/editar/${asset._id}`}
            className={buttonVariants({ variant: "ghost" })}
          >
            <Pencil />
          </Link>
          <Button
            onClick={() =>
              toast({
                description: "Confirmar para archivar el bien",
                action: (
                  <ToastAction
                    onClick={() => archiveAsset(asset._id)}
                    altText="Confirmar"
                  >
                    Confirmar
                  </ToastAction>
                ),
              })
            }
            variant="ghost"
          >
            <Archive />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={`${!showMore && "hidden"} w-full`}>
        <hr className="mb-5" />
        <p className="uppercase underline font-bold">Información del bien</p>
        {renderFieldShowCard(
          extraFields.filter(
            (field) => field.showCard === showCardOptions.EXPANDED.value
          ),
          "flex"
        )}
        <p className="uppercase underline font-bold mt-5">
          Información del destino
        </p>
        {/* {renderFieldShowCard(extraFields.filter((field) => field.showCard === showCardOptions.EXPANDED.value), 'flex')} */}
      </CardContent>
      <CardFooter className="w-full">
        <Button onClick={() => setShowMore(!showMore)} variant="link">
          {showMore ? "Ver menos" : "Ver más"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssetCard;
