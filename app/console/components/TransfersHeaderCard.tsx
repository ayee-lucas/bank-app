"use client";

import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BiTransfer } from "react-icons/bi";
import { getTransfers } from "../actions";

type CardProps = React.ComponentProps<typeof Card>;

const TransfersHeaderCard: FC<CardProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transfers, setTransfers] = useState<number>(0);

  useEffect(() => {
    const fetchTransfer = async () => {
      const res = await getTransfers();

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (res.message == "No Transfers Yet") {
        setTransfers(0);
        setLoading(false);
        return;
      }

      if (res.data) {
        setTransfers(res.data?.length);
        setLoading(false);
        return;
      }
    };

    fetchTransfer();
  }, []);

  return (
    <Card
      className={cn(
        "min-w-[380px] max-w-[380px] min-h-[160px] max-h-[160px] rounded-xl bg-violet-50",
        className
      )}
      {...props}
    >
      <CardHeader>
        <div className="flex justify-between w-full text-purple-700">
          <CardTitle className="text-sm">Total Transfers</CardTitle>
          <BiTransfer />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <span className="text-purple-700 animate-bounce text-4xl">.</span>
          </div>
        ) : (
          <div className="w-full h-full grid place-items-center">
            {error ? (
              <span className="text-red-600 text-sm">{error}</span>
            ) : (
              <span className="text-purple-700 text-4xl">{transfers}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-gray-500 text-sm">
        Transfers done at the moment
      </CardFooter>
    </Card>
  );
};

export default TransfersHeaderCard;
