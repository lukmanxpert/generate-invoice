import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { currencyOptions, TCurrencyKey } from "@/lib/utils";
import invoiceModel, { IInvoice } from "@/models/invoice.model";
import moment from "moment";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({
        message: "Unauthorized access",
      });
    }

    await connectDB();

    const thirtyDayAgo = new Date();
    thirtyDayAgo.setDate(thirtyDayAgo.getDate() - 30);

    const query = {
      invoice_date: {
        $gte: thirtyDayAgo,
      },
      userId: session.user.id,
    };

    const [data, totalInvoice, paidInvoice, UnpaidInvoice, recentInvoice] =
      await Promise.all([
        invoiceModel.find(query),
        invoiceModel.countDocuments(query),
        invoiceModel.countDocuments({ ...query, status: "PAID" }),
        invoiceModel.countDocuments({ ...query, status: "UNPAID" }),
        invoiceModel.find(query).limit(5),
      ]);
    const totalRevenue = data.reduce((prev, curr) => prev + curr.total, 0);

    const chartData = data.map((item: IInvoice) => {
      return {
        date: moment(item.invoice_date).format("YYYY-MM-DD"),
        totalRevenue: item.total,
        paidRevenue: item.status === "PAID" ? item.total : 0,
      };
    });
    // console.log("dashboard api")
    // console.log("data",data)
    return NextResponse.json({
      message: "Success",
      totalRevenue: `${
        currencyOptions[session.user.currency as TCurrencyKey]
      }${totalRevenue}`,
      totalInvoice,
      paidInvoice,
      UnpaidInvoice,
      recentInvoice,
      chartData,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error || error.message || "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
