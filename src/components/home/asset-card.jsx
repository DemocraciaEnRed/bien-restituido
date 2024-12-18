import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  assetDestination,
  fontAwesomeIcons,
  showCardOptions,
} from "@/lib/utils/constants";
import { ChevronDown, ChevronDownCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const AssetCard = ({ asset }) => {
  const renderFieldShowCard = (fields, ordering) => {
    return (
      <span>
        {Object.keys(fields).map((key) => {
          if (fields[key].type === "url") return null;
          return (
            <span key={key} className={`ml-2 ${ordering}`}>
              <span className="underline font-bold uppercase">{key}</span>:{" "}
              {fields[key].value}
            </span>
          );
        })}
      </span>
    );
  };

  const renderImages = (image) => {
    if (image)
      return (
        <div className="p-1 md:p-3">
          <Dialog>
            <DialogTrigger>
              <div className="w-20 h-24 overflow-hidden text-center rounded-xl">
                <img
                  src={image}
                  className="object-cover w-full h-full"
                  alt="imagen del bien"
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <img src={image} className="w-full" alt="imagen del bien" />
            </DialogContent>
          </Dialog>
        </div>
      );
  };

  return (
    <Collapsible
      className=" border-2 border-l-8 my-4 w-full p-4 rounded-lg"
      style={{
        borderLeftColor: asset.subCategory?.color,
      }}
    >
      <CollapsibleTrigger className="w-full text-left">
        <div className="flex items-center justify-between ">
          <div
            className="bg-slate-200 p-4 rounded-lg"
            style={{
              color: asset.subCategory?.color,
            }}
          >
            {
              fontAwesomeIcons.find(
                (icon) => icon.name === asset.subCategory?.icon
              )?.icon
            }
          </div>
          <div className="ml-2  flex-1 text-left flex  gap-2">
            <h6 className="text-xl font-bold">{asset.category.name}</h6>
            {renderFieldShowCard(
              asset.extras[showCardOptions.ALLWAYS.value],
              ""
            )}
          </div>
          <ChevronDownCircle className="h-4 w-4" />
        </div>
        <div className="m-3 flex gap-1">
          <Badge variant="secondary">{asset.province}</Badge>
          <Badge variant="secondary">
            {
              assetDestination.find(
                (destination) => destination.value === asset.destination
              ).name
            }
          </Badge>
          {asset.destinationInfo && asset.destinationInfo.status && (
            <Badge variant="secondary">
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
            </Badge>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-0 md:p-3">
        <Separator />
        <div className="flex">
          {renderImages(asset.assetImageURL)}
          <div>
            <h6 className="underline uppercase font-semibold">
              información del bien
            </h6>
            <div>
              <span className="underline uppercase font-semibold">
                Ubicación:
              </span>
              <span>{asset.location}</span>
              {renderFieldShowCard(
                asset.extras[showCardOptions.EXPANDED.value],
                "flex"
              )}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AssetCard;
