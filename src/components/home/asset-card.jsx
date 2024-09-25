import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { fontAwesomeIcons } from "@/lib/utils/constants";
import { ChevronDown, ChevronDownCircle } from "lucide-react";
import { Separator } from "../ui/separator";

const AssetCard = ({ asset }) => {
  return (
    <Collapsible
      className="border-y-0 border-r-0 border-l-8 my-4 w-full p-4 rounded-lg"
      style={{
        borderColor: asset.subCategory?.color,
      }}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <div className="bg-slate-200 p-4 rounded-lg">
          {
            fontAwesomeIcons.find(
              (icon) => icon.name === asset.subCategory?.icon
            )?.icon
          }
        </div>
        <span className="ml-2 font-bold flex-1 text-left">
          {asset.category.name}
        </span>
        <ChevronDownCircle className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        <Separator />
        <h6 className="underline uppercase font-semibold">
          información del bien
        </h6>
        <div>
          <span className="underline uppercase font-semibold">Ubicación:</span>
          <span>
            {asset.location}, {asset.province}
          </span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AssetCard;
