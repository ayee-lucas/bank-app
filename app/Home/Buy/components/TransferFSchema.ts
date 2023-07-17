import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const buySchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  senderAccount: z
    .string()
    .min(2, { message: "Sender account is too short" })
    .max(16, { message: "Sender account is too long" })
    .regex(/^\d+$/),
  recipient: z
    .string()
    .min(1, { message: "Recipient is too short" })
    .max(32, { message: "Recipient is too long" }),
  description: z
    .string()
    .min(6, { message: "Description is too short" })
    .max(64, { message: "Description is too long" }),
});

export const BuyFResolver = zodResolver(buySchema);

export default buySchema;
export type BuyFType = z.infer<typeof buySchema>;
