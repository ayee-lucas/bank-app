import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transferSchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  senderAccount: z
    .string()
    .min(2, { message: "Sender Account is too short" })
    .max(25, { message: "Sender Account is too long" }),
  receiverAccount: z
    .string()
    .min(2, { message: "Sender Account is too short" })
    .max(25, { message: "Sender Account is too long" }),
  status: z
    .boolean()
});

export const TransferFResolver = zodResolver(transferSchema);

export default transferSchema;
export type TransferFType = z.infer<typeof transferSchema>;
