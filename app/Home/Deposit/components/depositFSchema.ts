import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const depositSchema = z.object({
  amount: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  account: z
    .string()
    .min(2, { message: "Account is too short" })
    .max(25, { message: "Account is too long" })
});

export const DepositFRevolver = zodResolver(depositSchema);

export default depositSchema;
export type DepositFType = z.infer<typeof depositSchema>;
