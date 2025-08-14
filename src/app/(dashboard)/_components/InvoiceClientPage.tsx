"use client";
import Loading from "@/components/Loading";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IInvoice } from "@/models/invoice.model";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IInvoiceClientPage {
  currency: string | undefined;
}

export default function InvoiceClientPage({ currency }: IInvoiceClientPage) {
  const [data, setData] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

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
    fetchData();
  }, []);

  // column config
  const columns: ColumnDef<IInvoice>[] = [
    {
      accessorKey: "invoice_no",
      header: "Invoice No",
    },
    {
      accessorKey: "invoice_date",
      header: "Date",
      cell: ({ row }) => {
        return format(row.original.invoice_date, "PP");
      },
    },
    {
      accessorKey: "due_date",
      header: "Due",
      cell: ({ row }) => {
        return format(row.original.due_date, "PP");
      },
    },
    {
      accessorKey: "to.name",
      header: "Client Name",
    },
    {
      accessorKey: "total",
      header: "Amount",
      cell: ({ row }) => {
        const totalAmountInCurrencyFormat = new Intl.NumberFormat("en-us", {
          style: "currency",
          currency: currency,
        }).format(row.original.total);
        return totalAmountInCurrencyFormat;
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="sr-only">Open Menu</span>
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Send Email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
      {loading ? (
        <Loading />
      ) : (
        <>
          <DataTable columns={columns} data={data} key={"invoiceTable"} />
          <div className="my-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={()=>setPage(1)} />
                </PaginationItem>

                {new Array(totalPage).fill(null).map((item, index: number) => {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink href="#" onClick={()=>setPage(index+1)}>{index+1}</PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext href="#" onClick={()=>setPage(totalPage)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
