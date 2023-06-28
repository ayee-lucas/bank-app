import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const accTypeFSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(300, { message: "Name is too long" }),
  description: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(300, { message: "Name is too long" }),
});

export const AccTypeFResolver = zodResolver(accTypeFSchema);

export default accTypeFSchema;
export type AccTypeFType = z.infer<typeof accTypeFSchema>;