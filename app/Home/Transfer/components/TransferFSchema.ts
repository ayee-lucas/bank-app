import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transferSchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  senderAccount: z
    .string()
    .min(2, { message: "Sender account is too short" })
    .max(15, { message: "Sender account is too long" })
    .regex(/^\d+$/),
  receiverAccount: z
    .string()
    .min(2, { message: "Receiver account is too short" })
    .max(15, { message: "Receiver account is too long" })
    .regex(/^\d+$/),
});

export const TransferFResolver = zodResolver(transferSchema);

export default transferSchema;
export type TransferFType = z.infer<typeof transferSchema>;
