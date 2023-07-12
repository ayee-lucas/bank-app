import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    .email({ message: "invalid Email" })
    .min(2, { message: "Email is too short" }),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(24, { message: "Password is too long" }),
  dpi: z
    .string()
    .length(13, { message: "DPI must be 13 digits long" }),
  address: z
    .string()
    .min(8, { message: "Address is too short" })
    .max(128, { message: "Address is too long" }),
  phone: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(15, { message: "Phone number is too long" }),
  work: z
    .string()
    .min(8, { message: "Work description is too short" })
    .max(64, { message: "Work description is too long" }),
  salary: z
    .string({ required_error: "Invalid Amount" })
    .regex(/^\d+$/),
  role: z
    .enum(["admin", "user"], {
    errorMap: (issue, ctx) => {
      return { message: "Must be admin or user" };
    },
  }).transform(String),
});

export const UserFResolver = zodResolver(userSchema);

export default userSchema;
export type UserFType = z.infer<typeof userSchema>;
