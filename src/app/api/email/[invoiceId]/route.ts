import { InvoiceTemplate } from "@/components/template/SendInvoiceEmail";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { sendEmail } from "@/lib/email.config";
import { currencyOptions, TCurrencyKey } from "@/lib/utils";
import invoiceModel, { IInvoice } from "@/models/invoice.model";
import settingsModel, { ISettings } from "@/models/Settings.model";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
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
    const { invoiceId } = await params;
    const { subject } = await req.json();

    await connectDB();

    const settings: ISettings | null = await settingsModel.findOne({
      userId: session.user.id,
    });

    if (!settings) {
      return NextResponse.json(
        {
          message: "Please add logo and signature in settings",
        },
        {
          status: 400,
        }
      );
    }

    const invoiceData: IInvoice | null = await invoiceModel.findById(invoiceId);

    if (!invoiceData) {
      return NextResponse.json({
        message: "No invoice is found",
      });
    }

    const invoiceURL = `${process.env.DOMAIN}/api/invoice/${session.user.id}/${invoiceId}`;

    const emailResponse = await sendEmail(
      invoiceData.to.email,
      subject,
      InvoiceTemplate({
        firstName: session.user.firstName,
        invoiceNo: invoiceData.invoice_no,
        dueDate: format(invoiceData.due_date, "PPP"),
        total: `${currencyOptions[invoiceData.currency as TCurrencyKey]} ${
          invoiceData.total
        }`,
        invoiceUrl: invoiceURL,
      })
    );

    return NextResponse.json({
      message: "Email send successfully",
      data: emailResponse,
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
