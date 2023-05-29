import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import { BankAccount } from "@/app/models/BankAccount";
import User from "@/app/models/User";
import AccountType from "@/app/models/AccountType";

dbConnect();

interface params extends Request {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, params: params) {
  const id = params.params.id;

  try {
    const users = await User.find();
    const accountType = await AccountType.find();

    const bankAccount = await BankAccount.findById(id)
      .populate("client", "name username email dpi address phone work")
      .populate("accountType", "name description");

    const data = {
      bankAccount,
    };

    // Validar si no se encontró la notificación
    if (!bankAccount) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(bankAccount), {
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
    const bankAccount = await BankAccount.findByIdAndUpdate(id, data, {
      new: true,
    });

    // Validar si no se encontró la notificación
    if (!bankAccount) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(bankAccount), {
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
    const bankAccount = await BankAccount.findByIdAndDelete(id);

    // Validar si no se encontró la notificación
    if (!bankAccount) {
      return new NextResponse("Account not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(bankAccount), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
