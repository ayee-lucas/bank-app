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
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { deleteDeposit } from "../action";

type Props = {};

const Delete = (props: Props) => {
  const params = useSearchParams();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const id = params.get("delete");

  console.log(params.get("delete"));

  if (!id) return null;

  async function depositDelete(id: string) {
    const status = await deleteDeposit(id);

    console.log({STATUS: status})
                  
    if (status != 400){
      toast({
        title: "Deleted",
        description: "Deposit has been successfully deleted",
      })
      router.replace("/console/Deposit");
      router.refresh()
      return
    }

    toast({
      title: "Deposit not deleted",
      description: "Deposits cannot be deleted after 1 minute",
      variant: "destructive"
    })

    router.replace("/console/Deposit");
    router.refresh();
  }

    

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-violet-700 font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            deposit and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => router.push("/console/Deposit")}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-violet-200 text-violet-600 hover:bg-red-700 hover:text-white"
            onClick={() => depositDelete(id) }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
