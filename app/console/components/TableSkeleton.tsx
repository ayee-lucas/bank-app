import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {};

const TableSkeleton: FC<TableSkeletonProps> = ({}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Skeleton className="w-full h-[40px]" />
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className=" w-[300px] h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className=" w-[300px] h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className=" w-[300px] h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className=" w-[300px] h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className=" w-[300px] h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
      </div>
    </div>
  );
};

export default TableSkeleton;
