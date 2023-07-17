"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "./BuyForm";
import { useRouter } from "next/navigation";

const NewModal = () => {
  const router = useRouter();

  return (
    <Sheet
      defaultOpen={true}
      onOpenChange={() => router.push("/Home/Buy")}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-violet-700">Do a Buy</SheetTitle>
          <SheetDescription>
            This action will buy the product and transfer the specified amount to the recipient account.
          </SheetDescription>
        </SheetHeader>
        <ProfileForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewModal;
