import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BigSkeleton = () => {
  return (
    <>
      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <Separator className="w-1/2 my-3 h-1 mx-auto animate-pulse" />

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <Separator className="w-1/2 my-3 h-1 mx-auto animate-pulse" />

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>

      <div className="my-2">
        <Skeleton className="w-3/12 my-4 h-6 rounded-full" />
        <Skeleton className="w-full my-2 h-6 rounded-full" />
      </div>
    </>
  );
};

export default BigSkeleton;
