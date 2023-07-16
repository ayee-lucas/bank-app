"use server"

export async function getClientDeposits(_id: string | undefined) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/username/${_id}`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const users = await res.json();

  return users.accounts
}