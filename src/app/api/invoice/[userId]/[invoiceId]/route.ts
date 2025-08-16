import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { connectDB } from "@/lib/connectDB";
import settingsModel from "@/models/Settings.model";
import invoiceModel, { IInvoice } from "@/models/invoice.model";
import { format } from "date-fns";
import { currencyOptions, TCurrencyKey } from "@/lib/utils";

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
    const COLOR_CODE = "#8c00ff";
    const currencyStr = invoice.currency as TCurrencyKey;
    const currency = currencyOptions[currencyStr];

    // top border
    doc.setFillColor(COLOR_CODE);
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
    doc.text(`Invoice No. : ${invoice.invoice_no}`, FULL_WIDTH - 15, 35, {
      align: "right",
    });
    doc.text(
      `Invoice Date. : ${format(invoice.invoice_date, "PP")}`,
      FULL_WIDTH - 15,
      40,
      { align: "right" }
    );
    doc.text(
      `Due Date. : ${format(invoice.due_date, "PP")}`,
      FULL_WIDTH - 15,
      45,
      { align: "right" }
    );

    doc.text("Bill To.", 15, 60);

    // client details
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(invoice.to.name, 15, 70);

    // display address client
    doc.setFontSize(9);
    doc.setFont("times", "bold");
    doc.text(invoice.to.address1, 15, 75);
    doc.text(invoice.to.address2 as string, 15, 80);
    doc.text(invoice.to.address3 as string, 15, 85);

    const ITEM_XAXIS = 18;
    const QUANTITY_XAXIS = 110;
    const PRICE_XAXIS = 140;
    const TOTAL_AXIS = 165;

    // items
    doc.setFontSize(10.5);
    doc.setFillColor(COLOR_CODE);
    doc.rect(15, 95, FULL_WIDTH - 30, 6, "F");
    doc.setTextColor("#fff");
    doc.text("Items", ITEM_XAXIS, 99);
    doc.text("Quantity", QUANTITY_XAXIS, 99);
    doc.text("Price", PRICE_XAXIS, 99);
    doc.text("Total", TOTAL_AXIS, 99);

    // items details
    let Yaxis = 99;
    doc.setTextColor("#000");
    doc.setFontSize(10);

    invoice.items.forEach((item) => {
      Yaxis = Yaxis + 6;
      doc.text(`${item.item_name}`, ITEM_XAXIS, Yaxis);
      doc.text(`${item.quantity}`, QUANTITY_XAXIS, Yaxis);
      doc.text(`${item.price}`, PRICE_XAXIS, Yaxis);
      doc.text(`${item.total}`, TOTAL_AXIS, Yaxis);
    });

    doc.text("Sub Total", 160, Yaxis + 15);
    doc.text(`${invoice.sub_total}`, FULL_WIDTH - 15, Yaxis + 15, {
      align: "right",
    });

    doc.text("Discount", 160, Yaxis + 20);
    doc.text(`-${invoice.discount}`, FULL_WIDTH - 15, Yaxis + 20, {
      align: "right",
    });

    const sub_total_remove_discount =
      Number(invoice.sub_total) - Number(invoice.discount);
    doc.text(`${sub_total_remove_discount}`, FULL_WIDTH - 15, Yaxis + 25, {
      align: "right",
    });

    // tax percentage

    // pdf buffer create
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
