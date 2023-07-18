"use client";
import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRecentUsers } from "../actions";
import { IUser } from "@/app/models/User";
import TableSkeleton from "./TableSkeleton";

type RecentUsersTableProps = {};

const RecentUsersTable: FC<RecentUsersTableProps> = ({}) => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = await getRecentUsers();

      if (users.error) {
        setError(users.error);
        return setLoading(false);
      }

      if (users.message) {
        setError(users.message);
        return setLoading(false);
      }

      if (!users.data) {
        setError("Something went wrong");
        return setLoading(false);
      }

      setUsers(users.data);
      setLoading(false);
    };

    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <span>{error}</span>
      ) : (
        <Table>
          <TableCaption>A list of the recent users created.</TableCaption>
          <TableHeader>
            <TableRow className="dark:border-b-gray-600">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Bank Accounts</TableHead>
            </TableRow>
          </TableHeader>

          {users?.map((user) => (
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">
                  {user.accounts?.length}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      )}
    </>
  );
};

export default RecentUsersTable;
