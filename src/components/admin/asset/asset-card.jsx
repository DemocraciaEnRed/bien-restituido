'use client'
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fontAwesomeIcons, showCardOptions } from "@/lib/utils/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Archive, ArchiveX } from "lucide-react";
import Link from "next/link";
import { archiveAsset } from "@/lib/actions/admin/asset-actions/asset";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AssetCard = ({ asset }) => {
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);
  const { toast } = useToast();

  const renderFieldShowCard = (fields, ordering) => {
    return (
      <span>
        {Object.keys(fields).map((key) => {
          if (fields[key].type === "url") return null;
          else
            return (
              <span key={key} className={`mx-2 ${ordering}`}>
                <span className="font-bold">{key}</span>:{fields[key].value}
              </span>
            );
        })}
      </span>
    );
  };

  const renderImages = (fields) => {
    return (
      <div className="p-1 md:p-3">
        {Object.keys(fields).map((key) => {
          if (fields[key].type === "url")
            return (
              <Dialog key={key}>
                <DialogTrigger>
                  <div className="w-20 h-24 overflow-hidden text-center rounded-xl">
                    <img
                      src={fields[key].value}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <img src={fields[key].value} className="w-full" />
                </DialogContent>
              </Dialog>
            );
        })}
      </div>
    );
  };

  return (
    <Card
      className="border-y-0 border-r-0 border-l-8 my-4 w-full"
      style={{
        borderColor: pathname.includes("archivados")
          ? "rgb(229 231 235 / var(--tw-bg-opacity))"
          : asset.subCategory?.color,
      }}
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
                asset.extras[showCardOptions.ALLWAYS.value],
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
                  <span
                    className={`${
                      pathname.includes("archivados")
                        ? "bg-gray-200"
                        : "bg-pink-200"
                    } rounded-lg p-2 text-xs`}
                  >
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
                description: `Confirmar para ${
                  pathname.includes("archivados") ? "des" : ""
                }archivar el bien`,
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
            {pathname.includes("archivados") ? <ArchiveX /> : <Archive />}
          </Button>
        </div>
      </CardHeader>
      {asset.extras[showCardOptions.EXPANDED.value] && (
        <CardContent className={`${!showMore && "hidden"} w-full`}>
          <hr className="mb-5" />
          <div className="flex">
            {renderImages(asset.extras[showCardOptions.EXPANDED.value])}
            <div>
              <p className="uppercase underline font-bold">
                Información del bien
              </p>
              {renderFieldShowCard(
                asset.extras[showCardOptions.EXPANDED.value],
                "flex"
              )}
              {/* <p className="uppercase underline font-bold mt-5">
          Información del destino
        </p> */}
            </div>
          </div>
        </CardContent>
      )}
      {asset.extras[showCardOptions.EXPANDED.value] && (
        <CardFooter className="w-full">
          <Button onClick={() => setShowMore(!showMore)} variant="link">
            {showMore ? "Ver menos" : "Ver más"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AssetCard;
