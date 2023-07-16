"use client"; 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "./ProfileForm";
import { useRouter } from "next/navigation";

const NewModal = () => {
  const router = useRouter();

  return (
    <Sheet defaultOpen={true} onOpenChange={() => router.push("/console/AccountType")}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-violet-700">Add new account type</SheetTitle>
          <SheetDescription>
            This action will add a new account type to the system.
          </SheetDescription>
        </SheetHeader>
        <ProfileForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewModal;
