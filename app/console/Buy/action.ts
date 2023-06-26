"use server"
import { IBuy } from "@/app/models/Buy";
import { revalidatePath } from "next/cache";

export async function deleteTransfer(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/transfer/${_id}`, {
      method: 'DELETE',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    revalidatePath("/console/Transfer");
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function getBuys() {
  const res = await fetch(`http://localhost:3000/api/buy`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const buys: IBuy[] = await res.json();

  console.log(buys)

  return buys;
}

export async function getTransferById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/transfer/${_id}`, {
      method: 'GET',
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const transfer = await res.json();

    return transfer
  } catch (err) {
    console.log(err);
    return err;
  }
}
