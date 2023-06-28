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
import accTypeFSchema, {
  AccTypeFType,
  AccTypeFResolver,
} from "./accTypeFSchema";
import { IAccountType } from "@/app/models/AccountType";

type Props = {
  defaultValues: { [key: string]: string | undefined };
};

export default function AccTypeFEdit(defaultValues: Props) {
  const params = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const accountType = defaultValues;

  const [error, setError] = useState<boolean>(false);

  const id = params.get("edit");

  if (!id) return null;

  const form = useForm<AccTypeFType>({
    resolver: AccTypeFResolver,
    defaultValues: {
      name: accountType.defaultValues.name,
      description: accountType.defaultValues.description,
    },
  });

  const onSubmit = async (values: AccTypeFType) => {
    console.log(values);
    const res = await fetch(`/api/accountType/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      cache: "no-store",
    });

    const obj = await res.json();

    console.log(res);

    if (!res.ok) {
      toast({
        title: "Uh oh! Something went wrong",
        description: obj.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account type update",
      description: "Your account type has been updated.",
    });

    router.replace("/console/AccountType");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-800 font-semibold">
                Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-800 font-semibold">
                Description
              </FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>This is the public description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-violet-200 text-violet-700 hover:bg-violet-700 hover:text-white"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
