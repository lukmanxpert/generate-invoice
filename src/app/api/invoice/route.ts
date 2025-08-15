import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import invoiceModel from "@/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

// post invoice
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
    const {
      invoice_no,
      invoice_date,
      due_date,
      currency,
      from,
      to,
      items,
      sub_total,
      discount,
      tax_percentage,
      total,
      notes,
    } = await req.json();
    const payload = {
      invoice_no,
      invoice_date,
      due_date,
      currency: currency ?? "USD",
      from,
      to,
      items,
      sub_total,
      discount,
      tax_percentage,
      total,
      notes,
      status: "UNPAID",
      userId: session.user.id,
    };
    await connectDB();
    const data = await invoiceModel.create(payload);
    return NextResponse.json({
      message: "Invoice created success",
      data: data,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error?.message || error || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

// get invoice
export async function GET(req: NextRequest) {
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
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 2;
    const skip = (page - 1) * limit;

    const [allInvoice, totalCount] = await Promise.all([
      await invoiceModel
        .find({ userId: session.user.id })
        .skip(skip)
        .limit(limit).sort({createdAt: -1}),
      invoiceModel.countDocuments({ userId: session.user.id }),
    ]);
    // const allInvoice = await invoiceModel
    //   .find({ userId: session.user.id })
    //   .skip(skip)
    //   .limit(limit);
    const totalPage = Math.ceil(totalCount / limit);
    return NextResponse.json({
      message: "Success",
      success: true,
      error: false,
      data: allInvoice,
      totalCount: totalCount,
      totalPage: totalPage,
      page: page,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || error || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
