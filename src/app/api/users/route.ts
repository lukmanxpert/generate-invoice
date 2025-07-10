/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { firstName, lastName, currency } = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorize access.",
        },
        {
          status: 401,
        }
      );
    }
    // function connect to db
    const userDetails = await userModel.findByIdAndUpdate(session.user?.id, {
      firstName,
      lastName,
      currency,
    });
    return NextResponse.json({
      message: "User updated successfully",
      data: userDetails,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error || error.message || "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
