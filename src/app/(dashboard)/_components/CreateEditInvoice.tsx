"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { invoiceSchemaZod } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

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
    watch,
    setValue,
  } = useForm<z.infer<typeof invoiceSchemaZod>>({
    resolver: zodResolver(invoiceSchemaZod),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = (data: z.infer<typeof invoiceSchemaZod>) => {
    console.log("data :>> ", data);
  };
  return (
    <form action="" className="grid py-4 ">
      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {/* invoice no */}
        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-neutral-100 rounded-l-md">
              #
            </div>
            <Input
              type="text"
              placeholder="Invoice No."
              className="rounded-l-none"
              {...register("invoice_no", { required: true })}
            />
          </div>
          {errors.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
        {/* empty */}
        <div></div>
        {/* invoice date */}
        <div className="grid">
          <div className="flex items-center">
            <div className="min-w-9 min-h-9 text-center border h-full flex justify-center items-center bg-neutral-100 rounded-l-md">
              <CalendarIcon className="size-4" />
            </div>
            <Popover>
              <PopoverTrigger className="w-full" asChild>
                <Button
                  type="button"
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !watch("invoice_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none grow w-full"
                  )}
                >
                  {watch("invoice_date") ? (
                    format(watch("invoice_date"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("invoice_date")}
                  onSelect={(date) => {
                    setValue("invoice_date", date as Date, {
                      shouldValidate: true,
                    });
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
