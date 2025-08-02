"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import CreateEditInvoice from "../../_components/CreateEditInvoice";

export default function CreateInvoicePage() {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.back()}
          className="cursor-pointer"
          size={"icon"}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-xl font-semibold">Create Invoice</h1>
      </div>
      <CreateEditInvoice />
    </div>
  );
}
