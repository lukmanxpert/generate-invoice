"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { invoiceSchemaZod } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateEditInvoice {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
  currency: string | undefined;
}

export default function CreateEditInvoice({
  firstName,
  lastName,
  email,
  currency,
}: ICreateEditInvoice) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof invoiceSchemaZod>>({
    resolver: zodResolver(invoiceSchemaZod)
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = (data: z.infer<typeof invoiceSchemaZod>) => {
    console.log("data :>> ", data);
  };
  return <div>CreateEditInvoice</div>;
}
