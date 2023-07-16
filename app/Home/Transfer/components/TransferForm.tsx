"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TransferFResolver, TransferFType } from "./TransferFSchema";

export default function DepositForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [error, setError] = useState<boolean>(false);

  const form = useForm<TransferFType>({
    resolver: TransferFResolver,
    defaultValues: {
      amount: "0",
      senderAccount: "",
      receiverAccount: ""
    },
  });

 async function onSubmit(values: TransferFType) {
    console.log(values);

     const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const obj = await res.json();
    console.log({RES: obj})

    if (res.status === 404) {
      setError(true);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      return;
    } 

    if (!res.ok) {
      setError(true);
      toast({
        title: "Uh oh! Something went wrong",
        description: obj.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transfer saved",
      description: "Your transfer has been saved.",
    });

    router.replace("/console/Transfer");
    router.refresh(); 
    return
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormDescription>
                  This is the deposit amount.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senderAccount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Sender Account
                </FormLabel>
                <FormControl>
                  <Input placeholder="Sender account" {...field} />
                </FormControl>
                <FormDescription>
                  This is the sender account number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiverAccount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Receiver Account
                </FormLabel>
                <FormControl>
                  <Input placeholder="Receiver account" {...field} />
                </FormControl>
                <FormDescription>
                  This is the receiver account number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-violet-200 text-violet-700 hover:bg-violet-700 hover:text-white max-w-lg w-full"
          >
            Submit
          </Button>
      </form>
    </Form>
  );
}
