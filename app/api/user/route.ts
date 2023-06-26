import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import User from "@/app/models/User";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // Get all account types with related data
    const user = await User.find();
    const data = user;

    if (user.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No User Yet" }), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}