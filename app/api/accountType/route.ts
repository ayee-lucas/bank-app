import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import AccountType from "@/app/models/AccountType";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // Obtener todas las notificaciones con datos relacionados
    const accountType = await AccountType.find();
    const data = {
      accountType,
    };

    if (accountType.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No Posts Yet" }), {
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

    // Validate the required fields in the request body
    /*if (!json.recipient || !json.sender || !json.type) {
        return new NextResponse(
          JSON.stringify({
            message: "Missing required fields in the request body.",
          }),
          { status: 400 }
        );
      }*/

    // Create a new notification object with the parsed data
    const data = new AccountType(json);
    console.log({ AccountTypeCreated: data });

    // Save the notification object to the database
    const accountType = await data.save();

    // Return a NextResponse object with the saved notification data and a 200 status code
    return new NextResponse(JSON.stringify(accountType), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // If there is any other error, return a NextResponse object with an error message and a 500 status code
    const error = {
      message: "Error saving notification.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
