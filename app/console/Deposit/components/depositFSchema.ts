import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const depositFSchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .min(0, { message: "Amount is too short" })
    .max(30, { message: "The max amount is 10000" })
    .regex(/^\d+$/),
  account: z
    .string()
    .min(2, { message: "Account is too short" })
    .max(30, { message: "Account is too long" }),
});

export const depositFResolver = zodResolver(depositFSchema);

export default depositFSchema;
export type depositFType = z.infer<typeof depositFSchema>;