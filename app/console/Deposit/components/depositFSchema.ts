import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const depositFSchema = z.object({
  amount: z
    .number()
    .positive({message: "El monto debe ser mayor a 0"})
    .lte(10000, {message: "El monto máximo es de 10000"}),
  account: z
    .string()
    .min(2, { message: "Account is too short" })
    .max(30, { message: "Account is too long" }),
});

export const depositFResolver = zodResolver(depositFSchema);

export default depositFSchema;
export type depositFType = z.infer<typeof depositFSchema>;