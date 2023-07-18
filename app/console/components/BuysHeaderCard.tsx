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
import { getBuys } from "../actions";
import { AiOutlineShoppingCart } from "react-icons/ai";

type CardProps = React.ComponentProps<typeof Card>;

const BuysHeaderCard: FC<CardProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buys, setBuys] = useState<number>(0);

  useEffect(() => {
    const fetchBuys = async () => {
      const res = await getBuys();

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (res.message == "No Buys Yet") {
        setBuys(0);
        setLoading(false);
        return;
      }

      if (res.data) {
        setBuys(res.data?.length);
        setLoading(false);
        return;
      }
    };

    fetchBuys();
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
          <CardTitle className="text-sm">Total Buys</CardTitle>
          <AiOutlineShoppingCart />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-full grid place-items-center">
            <div className="flex items-center gap-2">
              <span className="text-purple-700 animate-bounce text-4xl">.</span>
              <span className="text-purple-700 animate-bounce delay-75 text-4xl">
                .
              </span>
              <span className="text-purple-700 animate-bounce delay-100 text-4xl">
                .
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full grid place-items-center">
            {error ? (
              <span className="text-red-600 text-sm">{error}</span>
            ) : (
              <span className="text-purple-700 text-4xl">{buys}</span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-gray-500 text-sm">
        All Buys made at the moment
      </CardFooter>
    </Card>
  );
};

export default BuysHeaderCard;
