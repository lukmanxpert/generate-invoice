import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

// protected
export default async function ProtectedPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return <></>;
}

// unprotected
export async function UnProtectedPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return <></>
}
