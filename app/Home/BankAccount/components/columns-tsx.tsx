"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsClipboardPlus } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IBankAccount } from "@/app/models/BankAccount";

export const columns: ColumnDef<IBankAccount>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "accNumber",
    header: "Account Number",
  },
  {
    accessorKey: "balance",
    header: "balance",
  },
  {
    accessorKey: "accountType.name",
    header: "Account Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bankAccount = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuLabel className=" font-bold">
              ACTIONS
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(bankAccount._id)}
            >
              <BsClipboardPlus className="mr-2" /> Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
