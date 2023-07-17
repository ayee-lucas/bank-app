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
import { useSession } from "next-auth/react";

export default function UserForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [error, setError] = useState<boolean>(false);

  const { data: session } = useSession();

  const form = useForm<bankAccFType>({
    resolver: bankAccFResolver,
    defaultValues: {
      client: {_id: session?.user.id.toString()},
      balance: "",
      accountType: {_id: ""}
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

 async function onSubmit(values: bankAccFType) {
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

     const res = await fetch("/api/bankAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

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
      title: "Bank account saved",
      description: "Your bank account has been saved.",
    });

    router.replace("/Home/BankAccount");
    router.refresh(); 
    return
  }

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
