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
