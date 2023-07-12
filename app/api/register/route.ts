import { NextResponse, NextRequest } from "next/server";
import User, { IUser } from "@/app/models/User";
import { hashPassword } from "@/app/tools/encrypt";
import dbConnect from "@/app/db/connection";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    const json: IUser = await req.json();

    if (!json.username || !json.email) {
      return new NextResponse(
        JSON.stringify({ message: "Username and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (json.password.length < 6) {
      return new NextResponse(
        JSON.stringify({
          message: "Password should be at least 8 characters long",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const usernameTaken = await User.findOne({ username: json.username });

    if (usernameTaken)
      return new NextResponse(
        JSON.stringify({ message: "Username already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );

    const emailTaken = await User.findOne({ email: json.email });

    if (emailTaken)
      return new NextResponse(
        JSON.stringify({
          message: "Email already exists",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );

    const hashedPassword = await hashPassword(json.password);

    json.password = hashedPassword as string;

    const user = new User(json);

    await user.save();

    console.log({ userSaved: user });

    return new NextResponse(JSON.stringify({ message: "success", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ err }), { status: 500 });
  }
}
