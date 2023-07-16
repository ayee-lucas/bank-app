"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "./TransferForm";
import { useRouter } from "next/navigation";

const NewModal = () => {
  const router = useRouter();

  return (
    <Sheet
      defaultOpen={true}
      onOpenChange={() => router.push("/console/Transfer")}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-violet-700">Do a Transfer</SheetTitle>
          <SheetDescription>
            This action will transfer the specified amount to a receiver account.
          </SheetDescription>
        </SheetHeader>
        <ProfileForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewModal;
