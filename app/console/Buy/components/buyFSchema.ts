import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const buySchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  senderAccount: z
    .string()
    .min(2, { message: "Sender Account is too short" })
    .max(25, { message: "Sender Account is too long" }),
  recieverAccount: z
    .string()
    .min(2, { message: "Sender Account is too short" })
    .max(25, { message: "Sender Account is too long" }),
  description: z
    .string()
    .min(8, { message: "Description is too short" })
    .max(128, { message: "Description is too long" }),
});

export const BuyFResolver = zodResolver(buySchema);

export default buySchema;
export type BuyFType = z.infer<typeof buySchema>;
