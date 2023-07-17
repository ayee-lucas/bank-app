import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import User from "@/app/models/User";
import Deposit from "@/app/models/Deposit";
import Transfer from "@/app/models/Transfer";
import Buy from "@/app/models/Buy";
import AccountType from "@/app/models/AccountType";

dbConnect();

interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  console.log(`Username: ${id}`);

  try {
    const deposits = await Deposit.find();
    const transfers = await Transfer.find();
    const accountType = await AccountType.find();
    const buys = await Buy.find();
    const user = await User.findOne({ username: id })
    .populate([ 
      { path: 'accounts', select: 'accNumber client balance accountType buys deposits transfers', 
        populate: [ { path: 'accountType', select: 'name' },
                    { path: 'deposits', select: 'amount account createdAt updatedAt' }, 
                    { path: 'transfers', select: 'amount senderAccount receiverAccount createdAt updatedAt' },
                    { path: 'buys', select: 'amount senderAccount recipient description createdAt updatedAt' } ] },
    ])
    console.log({USER_IN_API_USERNAME: user})

    if (!user) {
      return new NextResponse("User not found", {
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
