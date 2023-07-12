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
import { UserFResolver, UserFType } from "./userFSchema";

type Props = {
  defaultValues: { [key: string]: string | undefined };
};

export default function PasswordEdit(defaultValues: Props) {
  const params = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const user = defaultValues;

  const [error, setError] = useState<boolean>(false);

  const id = params.get("editPassword");

  if (!id) return null;

  const form = useForm<UserFType>({
    resolver: UserFResolver,
    defaultValues: {
      name: user.defaultValues.name,
      username: user.defaultValues.username,
      email: user.defaultValues.email,
      password: user.defaultValues.password,
      dpi: user.defaultValues.dpi,
      address: user.defaultValues.address,
      phone: user.defaultValues.phone,
      work: user.defaultValues.work,
      salary: user.defaultValues.salary,
      role: user.defaultValues.role
    },
  });

  const onSubmit = async (values: UserFType) => {
    console.log(values);
    const res = await fetch(`/api/user/${id}`, {
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
      title: "Password update",
      description: "The user password has been updated.",
    });

    router.replace("/console/Users");
    router.refresh();
  };

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field}/>
                </FormControl>
                <FormDescription>
                  Insert new password.
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
