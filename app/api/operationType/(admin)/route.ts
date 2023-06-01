import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import OperationType, { IOperationType } from "@/app/models/OperationType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // Get all bank operation types
    const operationTypes = await OperationType.find();

    const data = {
      operationTypes,
    };

    if (operationTypes.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No bank operation types registered" }),
        { status: 200 }
      );
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // Parse the request body as JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Create a new bank operation type object with the parsed data
    const operationType: IOperationType = new OperationType(json);
    console.log({ OperationTypeCreated: operationType });

    // Save the bank operation type object to the database
    const savedOperationType = await operationType.save();

    // Return a NextResponse object with the saved bank operation type data and a status code of 200
    return new NextResponse(JSON.stringify(savedOperationType), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // If there is any other error, return a NextResponse object with an error message and a status code of 500
    const error = {
      message: "Error saving the bank operation type.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
