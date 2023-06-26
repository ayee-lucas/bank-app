import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import User from "@/app/models/User";

dbConnect();

interface Params extends Request {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: Params) {
  const id = params.params.id;

  try {
    const user = await User.findById(id);

    // Validate if the transfer was not found
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