"use server";
import dbConnect from "@/app/db/connection";
import Deposit, { IDeposit } from "@/app/models/Deposit";
import { revalidatePath } from "next/cache";

export async function deleteDeposit(_id: string) {
  console.log({ serverID: _id });
  try {
    dbConnect();
    const deposit = await Deposit.findById(_id);

    if (!deposit) {
      return new Error("No deposit found");
    }

    const deletedDeposit = await Deposit.findByIdAndDelete(_id);

    console.log({DEPOSIT_DELETED: deletedDeposit });

    revalidatePath("/console/Deposit");
  } catch (err) {
    console.log(err);
  }
}

export async function getDeposits() {
  const res = await fetch(`http://localhost:3000/api/deposit`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const deposits: IDeposit[] = await res.json();

  console.log(deposits)

  return deposits;
}

export async function getDepositById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/Deposit/${_id}`, {
      method: 'GET',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const deposit = await res.json();

    return deposit.createdAt;
  } catch (err) {
    console.log(err);
    return err;
  }
}