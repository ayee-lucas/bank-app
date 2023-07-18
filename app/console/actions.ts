"use server";

import dbConnect from "../db/connection";
import { IBankAccount } from "../models/BankAccount";
import { IBuy } from "../models/Buy";
import Transfer, { ITransfer } from "../models/Transfer";
import User, { IUser } from "../models/User";

let debounceTimeout: NodeJS.Timeout | null = null;

const nextUrl = process.env.NEXTAUTH_URL as string;

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

type GetUsersRes = {
  message?: "No User Yet";
  data?: IUser[];
  error?: string;
};

export const getUsers = async (): Promise<GetUsersRes> => {
  try {
    const res = await fetch(`${nextUrl}/api/user`, {
      method: "GET",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return {
        error: "Something went wrong",
      };
    }

    const data = await res.json();

    if (data.message) {
      return {
        message: data.message,
      };
    }

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error fetching users",
    };
  }
};

type GetBankAccRes = {
  message?: "No bank accounts registered";
  data?: IBankAccount[];
  error?: string;
};

export const getBankAcc = async (): Promise<GetBankAccRes> => {
  try {
    const res = await fetch(`${nextUrl}/api/bankAccount`, {
      method: "GET",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return {
        error: "Something went wrong",
      };
    }

    const data = await res.json();

    if (data.message) {
      return {
        message: data.message,
      };
    }

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error fetching bank accounts",
    };
  }
};

type GetTransfersRes = {
  message?: "No Transfers Yet";
  data?: ITransfer[];
  error?: string;
};

export const getTransfers = async (): Promise<GetTransfersRes> => {
  try {
    const res = await fetch(`${nextUrl}/api/transfer`, {
      method: "GET",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return {
        error: "Something went wrong",
      };
    }

    const data = await res.json();

    if (data.message) {
      return {
        message: data.message,
      };
    }

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error fetching transfers",
    };
  }
};

type GetBuysRes = {
  message?: "No Buys Yet";
  data?: IBuy[];
  error?: string;
};

export const getBuys = async (): Promise<GetBuysRes> => {
  try {
    const res = await fetch(`${nextUrl}/api/buy`, {
      method: "GET",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return {
        error: "Something went wrong",
      };
    }

    const data = await res.json();

    if (data.message) {
      return {
        message: data.message,
      };
    }

    return {
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error fetching buys",
    };
  }
};

type GetRecentUsersRes = {
  message?: "No Recent Users Yet";
  data?: IUser[];
  error?: string;
};

export const getRecentUsers = async (): Promise<GetRecentUsersRes> => {
  try {
    await dbConnect();
    const users = await User.find().limit(5).sort({ createdAt: "desc" });

    if (users.length === 0) {
      return {
        message: "No Recent Users Yet",
      };
    }

    return {
      data: users as IUser[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error getting recent users",
    };
  }
};

type GetRecentTransfersRes = {
  message?: "No Recent Transfers Yet";
  data?: ITransfer[];
  error?: string;
};

export const getRecentTransfers = async (): Promise<GetRecentTransfersRes> => {
  try {
    await dbConnect();
    const transfers = await Transfer.find()
      .limit(5)
      .sort({ createdAt: "desc" });

    if (transfers.length === 0) {
      return {
        message: "No Recent Transfers Yet",
      };
    }

    return {
      data: transfers as ITransfer[],
    };
  } catch (err) {
    console.log(err);
    return {
      error: "Server error getting recent transfers",
    };
  }
};
