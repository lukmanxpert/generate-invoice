import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { connectDB } from "@/lib/connectDB";
import settingsModel from "@/models/Settings.model";
import invoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ invoiceId: string; userId: string }> }
) => {
  try {
    const { invoiceId, userId } = await params;

    await connectDB();
    const settings = await settingsModel.findOne({ userId: userId });
    const invoice: IInvoice | null = await invoiceModel.findById(invoiceId);

    if (!invoice) {
      return NextResponse.json({
        message: "No invoice found",
      });
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const FULL_WIDTH = 211;
    // top border
    doc.setFillColor("#8c00ff");
    doc.rect(0, 0, FULL_WIDTH, 2, "F");

    // invoice logo
    doc.addImage(settings.invoiceLogo, 15, 13, 60, 12);
    // invoice text
    doc.setFontSize(25);
    doc.text("INVOICE", FULL_WIDTH - 15, 22, { align: "right" });
    // company details ( user generate )
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(invoice.from.name, 15, 35);
    // display address
    doc.setFontSize(9);
    doc.setFont("times", "bold");
    doc.text(invoice.from.address1, 15, 40);
    doc.text(invoice.from.address2 as string, 15, 45);
    doc.text(invoice.from.address3 as string, 15, 50);
    // invoice number, invoice date, invoice due date
    doc.text(`Invoice No. : ${invoice.invoice_no}`, FULL_WIDTH - 15, 35, {align: "right"});
    doc.text(`Invoice Date. : ${format(invoice.invoice_date, 'PP')}`, FULL_WIDTH - 15, 40, {align: "right"});
    doc.text(`Invoice Date. : ${format(invoice.due_date, 'PP')}`, FULL_WIDTH - 15, 45, {align: "right"});

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": "inline",
      },
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
};
