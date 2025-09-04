"use client";
import Loading from "@/components/Loading";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { IInvoice } from "@/models/invoice.model";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface IInvoiceClientPage {
  currency: string | undefined;
  userId: string | undefined;
}

export default function InvoiceClientPage({
  userId,
  currency,
}: IInvoiceClientPage) {
  const [data, setData] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invoice?page=${page}`);
      const responseData = await response.json();
      if (response.status === 200) {
        setData(responseData.data || []);
        setTotalPage(responseData.totalPage || 1);
      } else {
        toast.error("Something went wrong!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // send email
  const handleSendEmail = async (invoiceId: string, subject: string) => {
    // fix it after bought a domain
    // toast.error("This features is not available due to domain issues");
    try {
      toast.loading("Please wait...");
      const response = await fetch(`/api/email/${invoiceId}`, {
        method: "post",
        body: JSON.stringify({
          subject: subject,
        }),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        toast.success(responseData.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 1000);
    }
  };

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
      accessorKey: "status",
      cell: ({ row }) => {
        return <Badge>{row.original.status}</Badge>;
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: ({ row }) => {
        const invoiceId = row.original._id.toString();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <span className="sr-only">Open Menu</span>
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/api/invoice/${userId}/${invoiceId}`)
                }
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/invoice/edit/${invoiceId}`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/invoice/paid/${invoiceId}`)}
              >
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  handleSendEmail(
                    invoiceId,
                    `Invoice from ${row.original.from.name}`
                  )
                }
              >
                Send Email
              </DropdownMenuItem>
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
          {totalPage !== 1 && (
            <div className="my-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={() => setPage(1)} />
                  </PaginationItem>

                  {new Array(totalPage)
                    .fill(null)
                    .map((item, index: number) => {
                      return (
                        <PaginationItem key={index}>
                          <PaginationLink
                            className="cursor-pointer"
                            onClick={() => setPage(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setPage(totalPage)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
