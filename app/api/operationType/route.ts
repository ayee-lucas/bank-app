import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import OperationType from "@/app/models/OperationType";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // Obtener todas las cuentas bancarias
    const operationType = await OperationType.find();

    const data = {
      operationType,
    };

    if (operationType.length === 0) {
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
    const operationType = new OperationType(json);
    console.log({ OperationTypeCreated: operationType });

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedOperationType = await operationType.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedOperationType), {
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
