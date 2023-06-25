"use server";

import dbConnect from "../db/connection";
import User from "../models/User";

export const getUserById = async (id: any) => {
  try {
    await dbConnect();
    const user = await User.findById(id);

    console.log(user)

    const data = {
        name: user?.name,
        username: user?.username,
        phone: user?.phone,
        work: user?.work,
    }
    return data as any;
  } catch (err) {
    console.log(err);
  }
};
