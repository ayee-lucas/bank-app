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
import { deleteTransfer } from "../action";

type Props = {};

const Delete = (props: Props) => {
  const params = useSearchParams();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const id = params.get("delete");

  console.log(params.get("delete"));

  if (!id) return null;

  async function transferDelete(id: string) {
    const status = await deleteTransfer(id);

    console.log({STATUS: status})
                  
    if (status != 400){
      toast({
        title: "Deleted",
        description: "Transfer has been successfully deleted",
      })
      router.replace("/console/Transfer");
      router.refresh()
      return
    }

    toast({
      title: "Transfer not deleted",
      description: "Transfers cannot be deleted after 1 minute",
      variant: "destructive"
    })

    router.replace("/console/Transfer");
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
            This will undo the transfer made and return the transferred amount to the sender.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => router.push("/console/Transfer")}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-violet-200 text-violet-600 hover:bg-red-700 hover:text-white"
            onClick={() => transferDelete(id) }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
