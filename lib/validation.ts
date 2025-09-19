import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, "At least 3 character")
    .max(32)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string("Password is required").trim().min(4, "At least 4 character needed")
});

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9._]+$/),
  password: z.string().min(4)
});

export const applicationPatchSchema = z
  .object({
    Status: z.enum(["NEW", "IN_PROGRESS", "SUBMITTED", "APPROVED", "REJECTED", "ON_HOLD"]).optional(),
    PassportNo: z
      .string()
      .max(32)
      .regex(/^[A-Za-z0-9\/\-\s]*$/)
      .nullable()
      .optional(),
    VisaNo: z
      .string()
      .max(32)
      .regex(/^[A-Za-z0-9\/\-\s]*$/)
      .nullable()
      .optional(),
    IssueDate: z.string().nullable().optional(),
    ExpiryDate: z.string().nullable().optional(),
    ApplicantName: z.string().max(120).nullable().optional(),
    DOB: z.string().nullable().optional(),
    Nationality: z.string().max(64).nullable().optional(),
    ContactEmail: z.email().nullable().optional(),
    ContactPhone: z
      .string()
      .min(7)
      .max(20)
      .regex(/^[0-9+()\-.\s]*$/)
      .nullable()
      .optional(),
    AddressLine1: z.string().max(200).nullable().optional(),
    AddressLine2: z.string().max(200).nullable().optional(),
    City: z.string().max(80).nullable().optional(),
    State: z.string().max(80).nullable().optional(),
    PostalCode: z.string().max(20).nullable().optional(),
    Notes: z.string().max(5000).nullable().optional()
  })
  .refine(
    (v) => {
      if (v.IssueDate && v.ExpiryDate) return new Date(v.IssueDate) <= new Date(v.ExpiryDate);
      return true;
    },
    { message: "IssueDate must be <= ExpiryDate", path: ["IssueDate"] }
  );
