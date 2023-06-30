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
import { UserFResolver, UserFType } from "./userFSchema";

export default function UserForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [error, setError] = useState<boolean>(false);

  const form = useForm<UserFType>({
    resolver: UserFResolver,
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      dpi: "",
      address: "",
      phone: "",
      work: "",
      salary: "0",
      role: "user",
    },
  });

 async function onSubmit(values: UserFType) {
    console.log(values);

     const res = await fetch("/api/user", {
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

    router.replace("/console/Users");
    router.refresh(); 
    return
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
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
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Username
                </FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>This is the user email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>This is your profile password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center gap-4">
          <FormField
              control={form.control}
              name="dpi"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-violet-800 font-semibold">
                    DPI
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="DPI" {...field} />
                  </FormControl>
                  <FormDescription>This is the DPI number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-violet-800 font-semibold">
                  Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormDescription>This is the user address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center gap-4">
          <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-violet-800 font-semibold">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormDescription>This is the phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-violet-800 font-semibold">
                    Work
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Work" {...field} />
                  </FormControl>
                  <FormDescription>This is the work description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="w-full flex items-center gap-4">
          <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-violet-800 font-semibold">
                    Salary
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Salary" {...field} />
                  </FormControl>
                  <FormDescription>This is the salary amount.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-violet-800 font-semibold">
                    Role
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Role" {...field} />
                  </FormControl>
                  <FormDescription>This is the user role.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
