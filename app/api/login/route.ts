import { NextRequest, NextResponse } from "next/server";
import User, { IUser } from "@/app/models/User";
import { comparePassword } from "@/app/tools/encrypt";
import { JWT } from "@/app/tools/jwt";
import dbConnect from "@/app/db/connection";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    console.log(await req.json());

    const json: IUser = await req.json();

    const credentials = {
      username: json.username,
      password: json.password,
    };

    if (credentials.username.length < 3) {
      return new NextResponse(
        JSON.stringify({ message: "Username too short" }),
        { status: 400 }
      );
    }

    if (credentials.password.length < 6) {
      return new NextResponse(
        JSON.stringify({ message: "Password too short" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ username: json.username });

    if (!user)
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });

    const isPasswordValid = await comparePassword(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: "Invalid password" }), {
        status: 401,
      });
    }

    const token = await JWT(user);

    const logged = {
      id: user.id,
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    };

    return new NextResponse(JSON.stringify(logged), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
