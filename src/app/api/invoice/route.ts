import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import invoiceModel from "@/models/invoice.model";
import { NextRequest, NextResponse } from "next/server";

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
