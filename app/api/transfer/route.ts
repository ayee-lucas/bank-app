import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import Transfer from "@/app/models/Transfer";
import User from "@/app/models/User";
import { BankAccount } from "@/app/models/BankAccount";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud como JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Crear un nuevo objeto de cuenta bancaria con los datos parseados
    const transfer = new Transfer(json);
    console.log({ TransferCreated: transfer });

    const bankAccount = await BankAccount.findOne({
      accNumber: transfer.senderAccount,
    });

    if (transfer.amount > bankAccount.balance) {
      return new NextResponse(
        JSON.stringify({
          message: "Insufficient balance to make the transfer",
        }),
        {
          status: 400,
        }
      );
    }

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedTransfer = await transfer.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedTransfer), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // Si hay algún otro error, devolver un objeto NextResponse con un mensaje de error y un código de estado 500
    const error = {
      message: "Error al ejecutar la transferencia.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all account types with related data
    const transfer = await Transfer.find();
    const data = transfer;

    if (transfer.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No Transfers Yet" }), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: err }), { status: 500 });
  }
}
