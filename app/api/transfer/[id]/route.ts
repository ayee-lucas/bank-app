import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import Transfer from "@/app/models/Transfer";
import { revalidateTag } from "next/cache";

dbConnect();

interface Params extends Request {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: Params) {
  const id = params.params.id;

  try {
    const transfer = await Transfer.findById(id);

    // Validate if the transfer was not found
    if (!transfer) {
      return new NextResponse("Transfer not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(transfer), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request, params: Params) {
  const id = params.params.id;

  try {
    const transfer = await Transfer.findById(id);

    // Validate if the transfer was not found
    if (!transfer) {
      return new NextResponse("Transfer not found", {
        status: 404,
      });
    }

    // Calculate the time difference in milliseconds
    const currentTime = new Date();
    const createdAt = transfer.createdAt;
    const timeDifference = currentTime.getTime() - createdAt.getTime();

    // Check if the time difference is greater than 1 minute (60000 milliseconds)
    if (timeDifference > 60000) {
      return new NextResponse("Cannot delete transfer after 1 minute", {
        status: 400,
      });
    }

    // Delete the transfer
    const deletedTransfer = await Transfer.findByIdAndDelete(id);

    return new NextResponse(JSON.stringify(deletedTransfer), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
