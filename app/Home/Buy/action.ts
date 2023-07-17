"use server"

export async function getClientAccounts(_id: string | undefined) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/username/${_id}`, {
    method: "GET",
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(res.statusText);

  const users = await res.json();

  return users.accounts
}

export async function getBuyById(_id: any) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/buy/${_id}`, {
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

export async function deleteBuy(_id: any) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/buy/${_id}`, {
      method: 'DELETE',
      next: { revalidate: 100 },
    });

    if(res.status == 400){
      return res.status
    }

    if (!res.ok) {
      throw new Error('Something went wrong');
    }
    
  } catch (err) {
    console.log(err);
    return err;
  }
}