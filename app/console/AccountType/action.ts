"use server";
import dbConnect from "@/app/db/connection";
import AccountType, { IAccountType } from "@/app/models/AccountType";
import { revalidatePath } from "next/cache";

export async function deleteAccountType(_id: any) {
  console.log({ serverID: _id });
  try {
    dbConnect();
    const account = await AccountType.findById(_id);

    if (!account) {
      return new Error("No user found");
    }

    const deletedUser = await AccountType.findByIdAndDelete(_id);

    console.log({ ACCOUNT_TYPE_DELETED: deletedUser });

    revalidatePath("/console/AccountType");
  } catch (err) {
    console.log(err);
  }
}

export async function getAccountTypes() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/accountType`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const accounts: IAccountType[] = await res.json();

  console.log('Request DONE!!!!')

  return accounts;
}
