import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import OperationType from "@/app/models/OperationType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

dbConnect();

interface Params extends NextRequest {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: Params) {
  const id = params.params.id;

  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const operationType = await OperationType.findById(id);

    // Validate if the operation type was not found
    if (!operationType) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(operationType), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest, params: Params) {
  const id = params.params.id;
  const data = await request.json();

  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const operationType = await OperationType.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Validate if the operation type was not found
    if (!operationType) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(operationType), {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest, params: Params) {
  const id = params.params.id;

  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const operationType = await OperationType.findByIdAndDelete(id);

    // Validate if the operation type was not found
    if (!operationType) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(operationType), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
