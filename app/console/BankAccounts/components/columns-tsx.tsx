"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsTrash2, BsClipboardPlus } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
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
    accessorKey: "client.username",
    header: "client",
  },
  {
    accessorKey: "currency",
    header: "currency",
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
      const router = useRouter();

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
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() =>
                router.replace(`/console/BankAccounts/?edit=${bankAccount._id}`)
              }
            >
              <HiOutlinePencil className="mr-2" /> Edit bank account
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.replace(`/console/BankAccounts?delete=${bankAccount._id}`)
              }
              className="text-red-500"
            >
              <BsTrash2 className="mr-2" /> Delete bank account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
