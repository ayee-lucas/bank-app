import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import User, { IUser } from "@/app/models/User";
import { getServerSession } from "next-auth";
import AccountType from "@/app/models/AccountType";
import { revalidateTag } from "next/cache";
import { authOptions } from "../../auth/[...nextauth]/route";

dbConnect();

interface Params extends Request {
  params: {
    username: string;
  };
}

export async function GET(request: NextRequest, params: Params) {
  const username = params.params.username;
  console.log(`Username: ${username}`);

  try {
    const user = await User.findOne({ username });

    // Validate if the user was not found
    if (!user) {
      console.log(user);

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
