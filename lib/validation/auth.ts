import { z } from "zod";

export const loginSchema = z.object({
  Email: z.email({ error: "Email is required" }).max(255),
  Password: z.string("Password is required").trim().min(4, "At least 4 character needed")
});
