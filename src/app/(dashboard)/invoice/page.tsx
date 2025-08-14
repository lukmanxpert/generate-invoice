import { auth } from "@/lib/auth";
import React, { Suspense } from "react";
import InvoiceClientPage from "../_components/InvoiceClientPage";
import Loading from "@/components/Loading";

export default async function InvoicePage() {
  const session = await auth();
  return (
    <Suspense fallback={<Loading />}>
      <InvoiceClientPage currency={session?.user.currency} />
    </Suspense>
  );
}
