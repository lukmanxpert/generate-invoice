"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";

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
    control,
    setValue,
  } = useForm<z.infer<typeof invoiceSchemaZod>>({
    resolver: zodResolver(invoiceSchemaZod),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: z.infer<typeof invoiceSchemaZod>) => {
    console.log("data :>> ", data);
  };
  return (
    <form action="" className="grid py-4 gap-4 lg:gap-6">
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
                    "justify-start font-normal rounded-l-none flex-1 w-full"
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
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
        {/* due date */}

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
                    !watch("due_date") && "text-muted-foreground",
                    "justify-start font-normal rounded-l-none flex-1 w-full"
                  )}
                >
                  {watch("due_date") ? (
                    format(watch("due_date"), "PPP")
                  ) : (
                    <span>Due Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={watch("due_date")}
                  onSelect={(date) => {
                    setValue("due_date", date as Date, {
                      shouldValidate: true,
                    });
                  }}
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.invoice_no && (
            <p className="text-xs text-red-500">{errors.invoice_no.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:gap-6">
        {/* form (current user details) */}

        <div className="grid gap-2">
          <Label>Form</Label>
          {/* from name */}
          <div>
            <Input
              type="text"
              placeholder="From name"
              {...register("from.name", { required: true })}
            />
            {errors.from?.name && (
              <p className="text-xs text-red-500">{errors.from.name.message}</p>
            )}
          </div>
          {/* email */}
          <div>
            <Input
              type="email"
              placeholder="joe@example.com"
              {...register("from.email", { required: true })}
            />
            {errors.from?.email && (
              <p className="text-xs text-red-500">
                {errors.from.email.message}
              </p>
            )}
          </div>
          {/* address1 */}
          <div>
            <Input
              type="text"
              placeholder="Building No. / Flat No. / Shop No. / Building Name"
              {...register("from.address1", { required: true })}
            />
            {errors.from?.address1 && (
              <p className="text-xs text-red-500">
                {errors.from.address1.message}
              </p>
            )}
          </div>
          {/* address2 */}
          <div>
            <Input
              type="text"
              placeholder="Street Name / Landmark"
              {...register("from.address2", { required: true })}
            />
            {errors.from?.address2 && (
              <p className="text-xs text-red-500">
                {errors.from.address2.message}
              </p>
            )}
          </div>
          {/* address3 */}
          <div>
            <Input
              type="text"
              placeholder="City / State / Country / Postcode"
              {...register("from.address3", { required: true })}
            />
            {errors.from?.address3 && (
              <p className="text-xs text-red-500">
                {errors.from.address3.message}
              </p>
            )}
          </div>
        </div>

        {/* to (client details) */}

        <div className="grid gap-2">
          <Label>To</Label>
          {/* from name */}
          <div>
            <Input
              type="text"
              placeholder="To name"
              {...register("to.name", { required: true })}
            />
            {errors.to?.name && (
              <p className="text-xs text-red-500">{errors.to.name.message}</p>
            )}
          </div>
          {/* email */}
          <div>
            <Input
              type="email"
              placeholder="joe@example.com"
              {...register("to.email", { required: true })}
            />
            {errors.to?.email && (
              <p className="text-xs text-red-500">{errors.to.email.message}</p>
            )}
          </div>
          {/* address1 */}
          <div>
            <Input
              type="text"
              placeholder="Building No. / Flat No. / Shop No. / Building Name"
              {...register("to.address1", { required: true })}
            />
            {errors.to?.address1 && (
              <p className="text-xs text-red-500">
                {errors.to.address1.message}
              </p>
            )}
          </div>
          {/* address2 */}
          <div>
            <Input
              type="text"
              placeholder="Street Name / Landmark"
              {...register("to.address2", { required: true })}
            />
            {errors.to?.address2 && (
              <p className="text-xs text-red-500">
                {errors.to.address2.message}
              </p>
            )}
          </div>
          {/* address3 */}
          <div>
            <Input
              type="text"
              placeholder="City / State / Country / Postcode"
              {...register("to.address3", { required: true })}
            />
            {errors.to?.address3 && (
              <p className="text-xs text-red-500">
                {errors.to.address3.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* items details */}
      <div className="grid grid-cols-6 bg-neutral-50 py-1 px-1">
        <div className="col-span-3">Item</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Total</div>
      </div>
      {fields.map((item, index) => {
        return (
          <div key={index} className="grid grid-cols-6">
            <div className="col-span-3">Item</div>
            <div>Quantity</div>
            <div>Price</div>
            <div>Total</div>
          </div>
        );
      })}
    </form>
  );
}
