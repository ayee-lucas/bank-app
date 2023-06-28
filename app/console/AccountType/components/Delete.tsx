"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteAccountType } from "../action";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const Delete = (props: Props) => {
  const params = useSearchParams();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const id = params.get("delete");

  console.log(params.get("delete"));

  if (!id) return null;

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-violet-700 font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            account type and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => router.push("/console/AccountType")}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-violet-200 text-violet-600 hover:bg-red-700 hover:text-white"
            onClick={() =>
              startTransition(() => {
                deleteAccountType(id);
                toast({
                  title: "Deleted",
                  description: "Account Type has been successfully deleted",
                })
                router.replace("/console/AccountType");
                router.refresh();
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
