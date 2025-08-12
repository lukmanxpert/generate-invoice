"use client";
import React, { useEffect, useState } from "react";
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
import { CalendarIcon, DeleteIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ICreateEditInvoice {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined | null;
  currency: string | undefined;
  invoiceId?: string | undefined; //for edit section
}

export default function CreateEditInvoice({
  firstName,
  lastName,
  email,
  currency,
  invoiceId, //for edit section
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
    defaultValues: {
      items: [
        {
          item_name: "",
          quantity: 0,
          price: 0,
          total: 0,
        },
      ],
      from: {
        name: `${firstName} ${lastName}`,
        email: email as string,
      },
      tax_percentage: 0,
      currency: currency,
      discount: 0,
      sub_total: 0,
      total: 0,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // total of items
  const items = watch("items");
  useEffect(() => {
    items.forEach((item, index) => {
      const quantity = parseFloat(item.quantity.toString()) || 0;
      const price = parseFloat(item.price.toString()) || 0;
      const total = quantity * price;
      setValue(`items.${index}.total`, total);
    });
    const sub_total = items.reduce((prev, curr) => prev + curr.total, 0);
    setValue("sub_total", sub_total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items), setValue]);

  // add new item row
  const handleAddNewItemRow = (e: Event) => {
    e.preventDefault();
    append({
      item_name: "",
      quantity: 0,
      price: 0,
      total: 0,
    });
  };

  // remove item row
  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: z.infer<typeof invoiceSchemaZod>) => {
    // for create invoice
    if (!invoiceId) {
      setIsLoading(true);
      const response = await fetch("/api/invoice", {
        method: "post",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        toast.success(responseData?.message);
        router.push("/invoice");
      } else {
        toast.error("Something went wrong");
      }
      setIsLoading(false);
      return;
    }
    // for edit invoice
    console.log("data :>> ", data);
  };

  const sub_total = watch("sub_total") || 0;
  const discount = watch("discount") || 0;
  const subTotalRemoveDiscount = sub_total - discount;
  const taxAmount =
    (subTotalRemoveDiscount * watch("tax_percentage")) / 100 || 0;
  const totalAmount = subTotalRemoveDiscount + taxAmount;
  useEffect(() => {
    setValue("total", totalAmount);
  }, [setValue, totalAmount]);

  const totalAmountInCurrencyFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(totalAmount);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid py-4 gap-4 lg:gap-6"
    >
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
              disabled={isLoading}
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
                  disabled={isLoading}
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
          {errors.invoice_date && (
            <p className="text-xs text-red-500">
              {errors.invoice_date.message}
            </p>
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
                  disabled={isLoading}
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
          {errors.due_date && (
            <p className="text-xs text-red-500">{errors.due_date.message}</p>
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
      <div className="grid gap-2">
        <div className="grid grid-cols-6 bg-neutral-50 py-1 px-1 gap-2">
          <div className="col-span-3">Item</div>
          <div>Quantity</div>
          <div>Price</div>
          <div>Total</div>
        </div>

        {fields.map((item, index) => {
          return (
            <div key={index} className="grid grid-cols-6 gap-2">
              <div className="col-span-3">
                <Input
                  placeholder="Enter item name"
                  type="text"
                  {...register(`items.${index}.item_name`, { required: true })}
                  disabled={isLoading}
                />
                {errors.items && errors.items[index]?.item_name && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.item_name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Enter quantity"
                  type="number"
                  {...register(`items.${index}.quantity`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  disabled={isLoading}
                />
                {errors.items && errors.items[index]?.quantity && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.quantity.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Enter price"
                  type="number"
                  {...register(`items.${index}.price`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  disabled={isLoading}
                />
                {errors.items && errors.items[index]?.price && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.price.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Input
                  placeholder="Enter total"
                  type="number"
                  {...register(`items.${index}.total`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                  disabled
                />
                {errors.items && errors.items[index]?.total && (
                  <p className="text-xs text-red-500">
                    {errors.items[index]?.total.message}
                  </p>
                )}
                {index !== 0 && (
                  <div className="absolute top-0 right-0">
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      disabled={isLoading}
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-50 text-red-500 cursor-pointer"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <Button
          className="w-fit cursor-pointer"
          type="button"
          disabled={isLoading}
          onClick={() => handleAddNewItemRow}
        >
          Add Item
        </Button>
      </div>

      {/* sub total, discount, tax, total */}
      <div>
        <div className="max-w-md w-full ml-auto grid gap-2">
          {/* sub total */}
          <div className="grid grid-cols-2">
            <Label>Sub Total: </Label>
            <Input
              disabled
              placeholder="Sub total"
              type="number"
              {...register("sub_total", { valueAsNumber: true })}
            />
          </div>
          {/* discount */}
          <div className="grid grid-cols-2">
            <Label>Discount: </Label>
            <Input
              value={watch("discount") ?? 0}
              placeholder="Discount"
              type="number"
              {...register("discount", { valueAsNumber: true })}
              disabled={isLoading}
            />
          </div>
          {/*  */}
          <div className="grid grid-cols-2">
            <Label></Label>
            <Input
              value={subTotalRemoveDiscount ?? ""}
              disabled
              placeholder="Sub total"
              type="number"
            />
          </div>
          {/* tax */}
          <div className="grid grid-cols-2">
            <Label>
              Tax:{" "}
              <Input
                placeholder="%"
                type="number"
                className="min-w-14 w-14 max-w-14"
                {...register("tax_percentage", { valueAsNumber: true })}
                disabled={isLoading}
              />{" "}
            </Label>
            <Input
              placeholder="Tax amount"
              type="number"
              value={taxAmount}
              disabled
            />
          </div>
          {/* total amount */}
          <div className="grid grid-cols-2">
            <Label>Total: </Label>
            <Input
              // value={totalAmount ?? ""}
              className="disabled:font-semibold"
              disabled
              placeholder="Total"
              type="number"
              {...register("total", { valueAsNumber: true })}
            />
          </div>
          {/*  */}
          <div className="flex justify-center items-center min-h-14 font-bold text-lg">
            {totalAmountInCurrencyFormat}
          </div>
        </div>
      </div>

      {/* notes */}
      <div className="grid gap-2 max-w-xl">
        <Label>Notes</Label>
        <Textarea
          disabled={isLoading}
          placeholder="Enter your notes"
          {...register("notes")}
        />
      </div>
      <Button disabled={isLoading} className="cursor-pointer" size={"lg"}>
        {isLoading ? "Please wait..." : "Create Invoice"}
      </Button>
    </form>
  );
}
