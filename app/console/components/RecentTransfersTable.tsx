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
import { ITransfer } from "@/app/models/Transfer";
import { getRecentTransfers } from "../actions";
import TableSkeleton from "./TableSkeleton";

type RecentTransfersTableProps = {};

const RecentTransfersTable: FC<RecentTransfersTableProps> = ({}) => {
  const [transfers, setTransfers] = useState<ITransfer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransfers = async () => {
      const transfers = await getRecentTransfers();

      if (transfers.error) {
        setError(transfers.error);
        return setLoading(false);
      }

      if (transfers.message) {
        setError(transfers.message);
        return setLoading(false);
      }

      if (!transfers.data) {
        setError("Something went wrong");
        return setLoading(false);
      }

      setTransfers(transfers.data);
      setLoading(false);
    };

    getTransfers();
  }, []);

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <span>{error}</span>
      ) : (
        <Table>
          <TableCaption>A list of the recent transfers made.</TableCaption>
          <TableHeader>
            <TableRow className="dark:border-b-gray-600">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead className="text-right">Receiver</TableHead>
            </TableRow>
          </TableHeader>

          {transfers?.map((transfer) => (
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{transfer._id}</TableCell>
                <TableCell>{transfer.amount}</TableCell>
                <TableCell>{transfer.senderAccount}</TableCell>
                <TableCell className="text-right">
                  {transfer.receiverAccount}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      )}
    </>
  );
};

export default RecentTransfersTable;
