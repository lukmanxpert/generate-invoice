"use client";
import Loading from "@/components/Loading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IInvoice } from "@/models/invoice.model";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InvoicePage() {
  const [data, setData] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/invoice");
      const responseData = await response.json();
      if (response.status === 200) {
        setData(responseData.data || []);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 className="text-xl font-semibold">Invoice</h1>
        <Link
          href={"/invoice/create"}
          className={cn(buttonVariants(), "cursor-pointer")}
        >
          Create Invoice
        </Link>
      </div>
      {
        data && data.length === 0 && !loading && (
          <div className="min-h-60 w-full bg-neutral-100 flex justify-center items-center rounded">
            <p className="font-semibold">No invoice data found!</p>
          </div>
        )
      }
      {
        loading && (
          <Loading />
        )
      }
    </div>
  );
}
