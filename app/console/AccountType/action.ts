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
  const res = await fetch(`http://localhost:3000/api/accountType`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const accounts: IAccountType[] = await res.json();

  console.log(accounts)

  return accounts;
}

export async function getAccountById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/Posts/post/${_id}`, {
      method: 'GET',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const account = await res.json();

    return account.createdAt;
  } catch (err) {
    console.log(err);
    return err;
  }
}
