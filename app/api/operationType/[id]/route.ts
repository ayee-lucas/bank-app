import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import OperationType from "@/app/models/OperationType";

dbConnect();

interface params extends Request {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: params) {
  const id = params.params.id;

  try {
    const operationType = await OperationType.findById(id);

    const data = {
      operationType,
    };

    // Validar si no se encontró la notificación
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

export async function PUT(request: Request, params: params) {
  const id = params.params.id;
  const data = await request.json();

  try {
    const operationType = await OperationType.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Validar si no se encontró la notificación
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

export async function DELETE(request: Request, params: params) {
  const id = params.params.id;

  try {
    const operationType = await OperationType.findByIdAndDelete(id);

    // Validar si no se encontró la notificación
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
