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
import { FiUsers } from "react-icons/fi";
import { getUsers } from "../actions";

type CardProps = React.ComponentProps<typeof Card>;

const UsersHeaderCard: FC<CardProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    const getUser = async () => {
      const res = await getUsers();

      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      if (res.message == "No User Yet") {
        setUsers(0);
        setLoading(false);
        return;
      }

      if (res.data) {
        setUsers(res.data?.length);
        setLoading(false);
        return;
      }
    };

    getUser();
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
          <CardTitle className="text-sm">Total Users</CardTitle>
          <FiUsers />
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
              <span className="text-purple-700 text-4xl">{users}</span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-gray-500 text-sm">
        User accounts created at the moment
      </CardFooter>
    </Card>
  );
};

export default UsersHeaderCard;
