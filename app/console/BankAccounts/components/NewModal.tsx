"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "./BankAccountForm";
import { useRouter } from "next/navigation";

const NewModal = () => {
  const router = useRouter();

  return (
    <Sheet
      defaultOpen={true}
      onOpenChange={() => router.push("/console/BankAccounts")}
    >
      <SheetContent side={'bottom'} className="">
        <SheetHeader>
          <SheetTitle className="text-violet-700">Add new bank account</SheetTitle>
          <SheetDescription>
            This action will add a bank account to the system.
          </SheetDescription>
        </SheetHeader>
        <ProfileForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewModal;
