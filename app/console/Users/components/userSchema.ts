import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const roleEnum = z.enum(["admin", "user"]);

type RoleType = typeof roleEnum;

const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(50, { message: "Name is too long" }),
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(25, { message: "Username is too long" }),
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .min(2, { message: "Email is too short" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(64, { message: "Password is too long" }),
  dpi: z
    .string()
    .min(14, { message: "DPI is too short" })
    .max(14, { message: "DPI is too long" }),
  address: z
    .string()
    .min(8, { message: "Address is too short" })
    .max(64, { message: "Address is too long" }),
  phone: z
    .string()
    .min(7, { message: "Phone is too short" })
    .max(15, { message: "Phone is too long" }),
  work: z
    .string()
    .min(8, { message: "Work is too short" })
    .max(64, { message: "Work is too long" }),
  salary: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/)
    .transform(Number),

  role: z.enum(["admin", "user"], {
    errorMap: (issue, ctx) => {
      return { message: "Must be admin or user" };
    },
  }),
});

export const UserFResolver = zodResolver(userSchema);

export default userSchema;
export type UserFType = z.infer<typeof userSchema>;
