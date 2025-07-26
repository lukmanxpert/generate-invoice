import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import settingsModel from "@/models/Settings.model";
import { NextRequest, NextResponse } from "next/server";

// create and update
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorize access",
        },
        {
          status: 401,
        }
      );
    }
    const { logo, signature } = await req.json();
    await connectDB();
    const setting = await settingsModel.findOne({ userId: session.user.id });

    const payload = {
      userId: session.user.id,
      ...(logo && { invoiceLogo: logo }),
      ...(signature && { signature: signature }),
    };

    // update the document
    if (setting) {
      const updateSetting = await settingsModel.findByIdAndUpdate(
        setting._id,
        payload
      );
      return NextResponse.json({
        message: "Settings update successfully",
        data: updateSetting,
      });
    }
    // create the document
    const createSettings = await settingsModel.create(payload);
    return NextResponse.json({
      message: "Settings update successfully",
      data: createSettings,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || error || "Something went wrong.",
        error: true,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

// get
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorize access",
          error: true,
          success: false,
        },
        {
          status: 401,
        }
      );
    }
    const getData = await settingsModel.findOne({ userId: session?.user.id });
    return NextResponse.json({
      message: "Success",
      data: getData,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error?.message || error || "something went wrong",
    });
  }
}
