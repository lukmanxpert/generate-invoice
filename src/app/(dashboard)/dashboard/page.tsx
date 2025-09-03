"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { IInvoice } from "@/models/invoice.model";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";
import { ChartInvoice } from "../_components/ChartInvoice";
import { DataTable } from "@/components/ui/DataTable";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  totalRevenue: {
    label: "Total Revenue",
    color: "var(--chart-1)",
  },
  paidRevenue: {
    label: "Paid Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [data, setData] = useState({
    totalRevenue: "$0",
    totalInvoice: 0,
    paidInvoice: 0,
    UnpaidInvoice: 0,
    recentInvoice: [],
    chartData: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const responseData = await response.json();

      console.log("responseData",responseData)
      if (response.status === 200) {
        setData({
          totalRevenue: responseData.totalRevenue,
          totalInvoice: responseData.totalInvoice,
          paidInvoice: responseData.paidInvoice,
          UnpaidInvoice: responseData.UnpaidInvoice,
          recentInvoice: responseData.recentInvoice || [],
          chartData: responseData.chartData || [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 grid gap-6  lg:grid-cols-4">
      <Card className="grid gap-3">
        <CardHeader>
          <CardTitle className="text-xl">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-lg">{data?.totalRevenue ?? "-"}</p>
            <span className="text-muted-foreground text-xs">last 30 days</span>
          </div>
        </CardContent>
      </Card>

      <Card className="grid gap-3">
        <CardHeader>
          <CardTitle className="text-xl">Total Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-lg">{data?.totalInvoice ?? "-"}</p>
            <span className="text-muted-foreground text-xs">last 30 days</span>
          </div>
        </CardContent>
      </Card>

      <Card className="grid gap-3">
        <CardHeader>
          <CardTitle className="text-xl">Paid Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-lg">{data?.paidInvoice ?? "-"}</p>
            <span className="text-muted-foreground text-xs">last 30 days</span>
          </div>
        </CardContent>
      </Card>

      <Card className="grid gap-3">
        <CardHeader>
          <CardTitle className="text-xl">Unpaid Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-lg">{data?.UnpaidInvoice ?? "-"}</p>
            <span className="text-muted-foreground text-xs">last 30 days</span>
          </div>
        </CardContent>
      </Card>

      {/***chart */}
      <ChartInvoice chartConfig={chartConfig} chartData={data.chartData} />

      {/***latest 10 Invoice last 30days */}
      
    </div>
  );
}