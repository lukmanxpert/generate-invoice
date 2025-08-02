import { ArrowLeft } from "lucide-react";
import React from "react";
import CreateEditInvoice from "../../_components/CreateEditInvoice";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function CreateInvoicePage() {
  const session = await auth();
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Link href={"/invoice"} className={buttonVariants({ size: "icon" })}>
          <ArrowLeft />
        </Link>
        <h1 className="text-xl font-semibold">Create Invoice</h1>
      </div>
      <CreateEditInvoice
        firstName={session?.user.firstName}
        lastName={session?.user.lastName}
        currency={session?.user.currency}
        email={session?.user.email}
      />
    </div>
  );
}
