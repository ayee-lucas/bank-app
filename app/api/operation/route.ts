import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import Operation from "@/app/models/Operation";
import User from "@/app/models/User";
import OperationType from "@/app/models/OperationType";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const users = await User.find();
    const operationTypes = await OperationType.find();

    const operations = await Operation.find()
      .populate({
        path: "operationType",
        select: "operationName description",
      })
      .populate({
        path: "senderAccount",
        populate: {
          path: "client",
          select: "name username email dpi address phone",
        },
      })
      .populate({
        path: "receiverAccount",
        populate: {
          path: "client",
          select: "name username email dpi address phone",
        },
      });

    const data = {
      operations,
    };

    if (operations.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No hay cuentas bancarias registradas" }),
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
    // Parsear el cuerpo de la solicitud como JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Crear un nuevo objeto de cuenta bancaria con los datos parseados
    const operation = new Operation(json);
    console.log({ OperationCreated: operation });

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedOperation = await operation.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedOperation), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // Si hay algún otro error, devolver un objeto NextResponse con un mensaje de error y un código de estado 500
    const error = {
      message: "Error al guardar la cuenta bancaria.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
