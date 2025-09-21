import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, "At least 3 character")
    .max(32)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string("Password is required").trim().min(4, "At least 4 character needed")
});
