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
import { bankAccFResolver, bankAccFType } from "./bankAccountFSchema";

export default function UserForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [error, setError] = useState<boolean>(false);

  const form = useForm<bankAccFType>({
    resolver: bankAccFResolver,
    defaultValues: {
      accNumber: "",
      client: {_id: ""},
      currency: "",
      balance: "",
      accountType: {_id: ""}
    },
  });

 async function onSubmit(values: bankAccFType) {
    console.log(values);

     const res = await fetch("/api/bankAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.status === 404) {
      setError(true);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      return;
    }

    const obj = await res.json();

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
      title: "User saved",
      description: "Your user has been saved.",
    });

    router.replace("/console/BankAccounts");
    router.refresh(); 
    return
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="w-full flex items-center gap-4">
        <FormField
            control={form.control}
            name="accountType._id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Account Type
                </FormLabel>
                <FormControl>
                  <Input placeholder="Account Type" {...field} />
                </FormControl>
                <FormDescription>This is the account type.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="client._id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Client
                </FormLabel>
                <FormControl>
                  <Input placeholder="Client" {...field} />
                </FormControl>
                <FormDescription>
                  This is the owner user.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Currency
                </FormLabel>
                <FormControl>
                  <Input placeholder="Currency" {...field} />
                </FormControl>
                <FormDescription>This is the currency.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Balance
                </FormLabel>
                <FormControl>
                  <Input placeholder="Balance" {...field} />
                </FormControl>
                <FormDescription>This is the account balance.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="accNumber"
            render={({ field }) => (
              <FormItem className="max-w-lg w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Account Number" {...field} />
                </FormControl>
                <FormDescription>
                  This is the account number.
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
        </div>
      </form>
    </Form>
  );
}
