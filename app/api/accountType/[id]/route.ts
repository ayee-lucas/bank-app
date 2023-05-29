import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
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
      const accountType = await AccountType.findById(id);
      
        const data = {
            accountType
        };  
  
      // Validar si no se encontró la notificación
      if (!accountType) {
        return new NextResponse("Notification not found", {
          status: 404,
        });
      }
  
      return new NextResponse(JSON.stringify(accountType), {
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
      const accountType = await AccountType.findByIdAndUpdate(id, data, {
        new: true,
      });
  
      // Validar si no se encontró la notificación
      if (!accountType) {
        return new NextResponse("Notification not found", {
          status: 404,
        });
      }
  
      return new NextResponse(JSON.stringify(accountType), {
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
      const accountType = await AccountType.findByIdAndDelete(id);
  
      // Validar si no se encontró la notificación
      if (!accountType) {
        return new NextResponse("Notification not found", {
          status: 404,
        });
      }
  
      return new NextResponse(JSON.stringify(accountType), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify(err), {
        status: 500,
      });
    }
  }