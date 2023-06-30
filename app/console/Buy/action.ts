"use server"

import { IBuy } from "@/app/models/Buy";

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

export async function getBuyById(_id: any) {
  try {
    const res = await fetch(`http://localhost:3000/api/buy/${_id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    const buy = await res.json();

    return buy
  } catch (err) {
    console.log(err);
    return err;
  }
}
