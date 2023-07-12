"use client";

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

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { bankAccFResolver, bankAccFType } from "./bankAccountFSchema";

type Props = {
  defaultValues: { [key: string]: string | undefined };
};

export default function BankAccountEdit(defaultValues: Props) {
  const params = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const bankAccount = defaultValues;

  const [error, setError] = useState<boolean>(false);

  const id = params.get("edit");

  if (!id) return null;

  const form = useForm<bankAccFType>({
    resolver: bankAccFResolver,
    defaultValues: {
      //@ts-expect-error
      client: {_id: bankAccount.defaultValues.client?.name},
      balance: bankAccount.defaultValues.balance?.toString(),
      //@ts-expect-error
      accountType: {_id: bankAccount.defaultValues.accountType?.name},
    },
  });

  async function searchAccountType(_id: any) {
    try {
      const res = await fetch(`http://localhost:3000/api/accountTypeName/${_id}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (res.status === 404) {
        return res
      }
  
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
  
      const account = await res.json();
  
      return account
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async function searchClient(_id: any) {
    try {
      const res = await fetch(`http://localhost:3000/api/username/${_id}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (res.status === 404) {
        return res
      }
  
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
  
      const client = await res.json();
  
      return client
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  const onSubmit = async (values: bankAccFType) => {
    console.log(values);

    const account = await searchAccountType(values.accountType._id)
    if(account.status == 404){
      setError(true);
      toast({
        title: "Uh oh! Something went wrong",
        description: "Account Type not found",
        variant: "destructive",
      });
      return;
    }

    values.accountType._id = account._id
    

    const client = await searchClient(values.client._id)
    if(client.status == 404){
      setError(true);
      toast({
        title: "Uh oh! Something went wrong",
        description: "Client not found",
        variant: "destructive",
      });
      return;
    }
    
    values.client._id = client._id

    const res = await fetch(`/api/bankAccount/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      cache: "no-store",
    });

    const obj = await res.json();

    if (!res.ok) {
      toast({
        title: "Uh oh! Something went wrong",
        description: obj.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bank Account update",
      description: "Your Bank Account has been updated.",
    });

    router.replace("/console/BankAccounts");
    router.refresh();
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormDescription>This is the Account Type.</FormDescription>
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
                  <Input placeholder="Client" {...field}/>
                </FormControl>
                <FormDescription>
                  This is the owner user.
                </FormDescription>
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
