import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import { BankAccount } from "@/app/models/BankAccount";
import User from "@/app/models/User";
import AccountType from "@/app/models/AccountType";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const users = await User.find();
    const accountType = await AccountType.find();

    // Obtener todas las cuentas bancarias
    const bankAccounts = await BankAccount.find()
      .populate("client", "name username email dpi address phone work")
      .populate("accountType", "name description");

    const data = {
      bankAccounts,
    };

    if (bankAccounts.length === 0) {
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
    const bankAccount = new BankAccount(json);
    console.log({ BankAccountCreated: bankAccount });

    // Guardar el objeto de cuenta bancaria en la base de datos
    const savedBankAccount = await bankAccount.save();

    // Devolver un objeto NextResponse con los datos de la cuenta bancaria guardada y un código de estado 200
    return new NextResponse(JSON.stringify(savedBankAccount), {
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
