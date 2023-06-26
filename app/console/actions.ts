"use server";

import dbConnect from "../db/connection";
import User from "../models/User";

let debounceTimeout: NodeJS.Timeout | null = null;

export const getUserById = async (id: any) => {
  try {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    await dbConnect();
    const user = await User.findById(id);

    console.log(user);

    const data = {
      name: user?.name,
      username: user?.username,
      phone: user?.phone,
      email: user?.email,
      work: user?.work,
    };

    // Set a debounce timeout of 1 second (1000 milliseconds)
    debounceTimeout = setTimeout(() => {
      debounceTimeout = null;
    }, 1000);

    return data as any;
  } catch (err) {
    console.log(err);
  }
};
