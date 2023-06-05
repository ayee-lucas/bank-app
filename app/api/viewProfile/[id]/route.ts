import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import { BankAccount } from "@/app/models/BankAccount";
import User from "@/app/models/User";
import AccountType from "@/app/models/AccountType";

dbConnect();

interface params extends Request {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: params) {
  const id = params.params.id;

  try {
    const user = await User.findById(id);

    // Validate if the bank account was not found
    if (!user) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
