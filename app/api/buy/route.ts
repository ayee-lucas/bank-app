import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import Buy from "@/app/models/Buy";
import User from "@/app/models/User";
import { BankAccount } from "@/app/models/BankAccount";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    // Parsear el cuerpo de la solicitud como JSON
    const json = await request.json();
    console.log({ DataRequest: json });

    // Crear un nuevo objeto de cuenta bancaria con los datos parseados
    const buy = new Buy(json);
    console.log({ BuyCreated: buy });

    const bankAccount = await BankAccount.findOne({
      accNumber: buy.senderAccount,
    });

    if (buy.amount > bankAccount.balance) {
      return new NextResponse(
        JSON.stringify({
          message: "Insufficient balance to make the purchase",
        }),
        {
          status: 400,
        }
      );
    }

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedBuy = await buy.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedBuy), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log({ err });

    // Si hay algún otro error, devolver un objeto NextResponse con un mensaje de error y un código de estado 500
    const error = {
      message: "Error Executing the Buy.",
      error: err,
    };
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all buys with related data
    const buy = await Buy.find();
    const data = buy;

    if (buy.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No Buys Yet" }), {
        status: 200,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: err }), { status: 500 });
  }
}
