import z from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name is required" })
    .max(50, { message: "First name contains max 10 character" }),
  lastName: z
    .string()
    .min(3, { message: "Last name is required" })
    .max(50, { message: "Last name contains max 10 character" }),
  currency: z.string({ message: "Select currency" }).optional(),
});

export const createInvoiceSchema = z.object({
  invoice_no: z.string().min(1, { message: "invoice no. required" }),
  invoice_date: z.date({ message: "Invoice date is required" }),
  due_date: z.date({ message: "invoice due date" }),
  currency: z.string({ message: "Currency is required" }),
  from: z.object({
    name: z
      .string()
      .min(3, { message: "name is required" })
      .max(100, { message: "name is max 100 character" }),
    email: z.string().email({ message: "email is required" }),
    address1: z.string().min(5, { message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),

  to: z.object({
    name: z
      .string()
      .min(3, { message: "name is required" })
      .max(100, { message: "name is max 100 character" }),
    email: z.string().email({ message: "email is required" }),
    address1: z.string().min(5, { message: "Address is required" }),
    address2: z.string().optional(),
    address3: z.string().optional(),
  }),

  items: z.array(
    z.object({
      item_name: z
        .string()
        .min(3, { message: "item name is required" })
        .max(100, { message: "Max character will be 100" }),
      quantity: z.number().min(0, { message: "Quantity can't be negative" }),
      price: z.number().min(0, { message: "price can't be negative" }),
      total: z.number().min(0, { message: "total can't be negative" }),
    })
  ),

  sub_total: z.number(),
  discount: z.number().default(0),

  tax_percentage: z.number().default(0),

  total: z.number(),

  notes: z.string().optional(),

  status: z.enum(["PAID", "UNPAID", "CANCEL"]),
});
