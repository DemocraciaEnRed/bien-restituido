import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pencil, Archive, ArchiveX, BookX, BookUp } from "lucide-react";
import Link from "next/link";
import {
  archiveAsset,
  togglePublish,
} from "@/lib/actions/admin/asset-actions/asset";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const CardActions = ({ asset, pathname }) => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col gap-2">
      <Tooltip delayDuration={300}>
        <TooltipTrigger>
          <Link href={`/admin/bien/editar/${asset._id}`}>
            <Pencil />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
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
          >
            {pathname.includes("archivados") ? <ArchiveX /> : <Archive />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{asset.archivedAt ? "Desarchivar" : "Archivar"}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
            type="button"
            onClick={() => {
              togglePublish(asset._id);
            }}
            className="submitButton w-full my-2"
          >
            {asset.publish ? <BookX /> : <BookUp />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{asset.publish ? "Despublicar" : "Publicar"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CardActions;
