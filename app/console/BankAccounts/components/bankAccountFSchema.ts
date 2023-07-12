import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const bankAccFSchema = z.object({
  client: z
    .object({
      _id: z.string()
    }),
  balance: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  accountType: z
    .object({
      _id: z.string()

    }),
});

export const bankAccFResolver = zodResolver(bankAccFSchema);

export default bankAccFSchema;
export type bankAccFType = z.infer<typeof bankAccFSchema>;
