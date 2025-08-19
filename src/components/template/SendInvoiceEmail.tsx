import { cn } from "@/lib/utils";
import * as React from "react";
import { buttonVariants } from "../ui/button";

interface EmailTemplateProps {
  firstName: string;
  invoiceNo: string;
  dueDate: string;
  total: string;
  invoiceUrl: string
}

export function InvoiceTemplate({
  firstName,
  invoiceNo,
  dueDate,
  total,
  invoiceUrl
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <div>
        <p>Invoice No: {invoiceNo}</p>
        <p>Due Date: {dueDate}</p>
        <p>Total: {total}</p>
      </div>
      <a href={invoiceUrl} className={cn(buttonVariants)}>Download Invoice</a>
    </div>
  );
}
