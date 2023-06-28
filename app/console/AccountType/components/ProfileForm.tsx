"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { AccTypeFType, AccTypeFResolver } from "./accTypeFSchema";


export default function ProfileForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [error, setError] = useState<boolean>(false);

  const form = useForm<AccTypeFType>({
    resolver: AccTypeFResolver,
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: AccTypeFType) {
    const res = await fetch("/api/accountType", {
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
      title: "Account type saved",
      description: "Your account type has been saved.",
    });

    router.replace("/console/AccountType");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-800 font-semibold">Name</FormLabel>
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
              <FormLabel className="text-violet-800 font-semibold">Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>This is the public description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-violet-200 text-violet-700 hover:bg-violet-700 hover:text-white">Submit</Button>
      </form>
    </Form>
  );
}
