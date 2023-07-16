import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/db/connection";
import AccountType, { IAccountType } from "@/app/models/AccountType";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Params extends Request {
  params: {
    id: string;
  };
}

dbConnect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  console.log({ PARAMS: id });
  try {
    const accountType = await AccountType.findById(id);

    // Validate if the account type is not found
    if (!accountType) {
      return new NextResponse(
        JSON.stringify({ message: "Account Type not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(accountType), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest, params: Params) {
  const id = params.params.id;
  const data = await request.json();

  try {
    

    // Validate if the request body is empty
    if (Object.keys(data).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Body Request Empty" }),
        {
          status: 400,
        }
      );
    }

    // Find the existing account type
    const existingAccountType = await AccountType.findById(id);

    // Validate if the account type is not found
    if (!existingAccountType) {
      return new NextResponse(
        JSON.stringify({ message: "Account Type Not Found" }),
        {
          status: 404,
        }
      );
    }

    // Validate if there's an AccountType with the same name
    const nameAlreadyExists = await AccountType.findOne({ name: data.name });

    // Validate if the name is already taken by a different account type
    if (nameAlreadyExists && nameAlreadyExists._id.toString() !== id) {
      return new NextResponse(
        JSON.stringify({ message: "This name is already taken" }),
        {
          status: 400,
        }
      );
    }


    const accountType = await AccountType.findByIdAndUpdate(id, data, {
      new: true,
    });

    const tag = request.nextUrl.searchParams.get("AccountType");
    revalidateTag(tag as string);

    return new NextResponse(JSON.stringify(accountType), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request, params: Params) {
  const id = params.params.id;

  try {
    const session = await getServerSession(authOptions);
    // Verify if the user is authenticated and is an admin
    /*if (!session?.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }*/

    const accountType = await AccountType.findByIdAndDelete(id);

    // Validate if the account type is not found
    if (!accountType) {
      return new NextResponse(
        JSON.stringify({ message: "Account Type Not Found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(JSON.stringify(accountType), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), {
      status: 500,
    });
  }
}
