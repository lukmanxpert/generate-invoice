"use client";
import CreateEditInvoice from "@/app/(dashboard)/_components/CreateEditInvoice";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditInvoice() {
  const { invoiceId } = useParams();
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Link href={"/invoice"} className={buttonVariants({ size: "icon" })}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold">Edit Invoice</h1>
      </div>
      <CreateEditInvoice
        invoiceId={invoiceId as string}
        // firstName={session?.user.firstName}
        // lastName={session?.user.lastName}
        // currency={session?.user.currency}
        // email={session?.user.email}
      />
    </div>
  );
}
