import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import User, { IUser } from "@/app/models/User";
import { revalidatePath } from "next/cache";

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

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Validate the request body
    const { name, username, email, password, dpi, phone, work, salary, role } = json;
    if (!username || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Username and password are required" }),
        {
          status: 400,
        }
      );
    }

    // Create a new account type object with the parsed data
    const newUser: IUser = new User({
      name,
      username,
      email,
      password,
      dpi,
      phone,
      work,
      salary,
      role,
    });
    console.log({ UserCreated: newUser });

    // Save the account type object to the database
    const savedUser = await newUser.save();

    revalidatePath('/console/Users')
    // Return a NextResponse object with the saved account type data and a 200 status code
    return new NextResponse(JSON.stringify(savedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // If there is any other error, return a NextResponse object with an error message and a 500 status code
    const error = {
      message: "Error saving user.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}