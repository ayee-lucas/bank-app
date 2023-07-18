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
import { getBankAcc } from "../actions";
import { AiFillBank } from "react-icons/ai";

type CardProps = React.ComponentProps<typeof Card>;

const BankAccHeaderCard: FC<CardProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bankAcc, setBankAcc] = useState<number>(0);

  useEffect(() => {
    const fetchBankAcc = async () => {
      const res = await getBankAcc();

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (res.message == "No bank accounts registered") {
        setBankAcc(0);
        setLoading(false);
        return;
      }

      if (res.data) {
        setBankAcc(res.data?.length);
        setLoading(false);
        return;
      }
    };

    fetchBankAcc();
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
          <CardTitle className="text-sm">Total Bank Accounts</CardTitle>
          <AiFillBank />
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
              <span className="text-purple-700 text-4xl">{bankAcc}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-gray-500 text-sm">
        Bank Accounts accounts created at the moment
      </CardFooter>
    </Card>
  );
};

export default BankAccHeaderCard;
