import { z } from "zod";
import { ApplicationStatus } from "@prisma/client";
import { nStr, nullableEmail, nullableInt } from "./helpers";

// base (matches Prisma field names)
const applicationBase = z.object({
  // meta
  Status: z.enum(ApplicationStatus),

  // form 1
  TravelPurpose: nStr(200),
  SpecificPurpose: nStr(200),

  // form 2
  LastName: nStr(120),
  BirthName: nStr(120), // required in model, but optional for PATCH via .partial()
  FirstName: nStr(120),
  Gender: nStr(32),
  DOB: nStr(20),
  POB: nStr(120),
  Country: nStr(40),
  Address: nStr(200),
  Phone: nullableInt,
  PassportIssueCountry: nStr(40),
  OriginalCitizenship: nStr(40),
  MaritalStatus: nStr(32),
  FathersFirstName: nStr(120),
  MothersFirstName: nStr(120),
  Email: nullableEmail,

  // form 3
  TravelDocumentType: nStr(64),
  DocumentNumber: nStr(64),
  POITD: nStr(120),
  IssueDate: nStr(20),
  ExpiryDate: nStr(20),

  // form 4
  ArrivalDate: nStr(20),
  DepartureDate: nStr(20),
  HostName: nStr(120),
  HostPhone: nullableInt,
  HostAddress: nStr(200),
  HostEmail: nullableEmail,
  Municipality: nStr(120),
  Settlement: nStr(120),
  Street: nStr(120),
  houseNumber: nStr(30),

  // form 5 (file paths/URLs)
  FacePhoto: nStr(1024),
  DocumentFirstPage: nStr(1024),
  InvitationLetter: nStr(1024),
  CertificateOfRegistration: nStr(1024),
  EmploymentContract: nStr(1024),
  ExtractFrom: nStr(1024),

  // required in model, optional in PATCH
  Diploma: nStr(1024),
  Additional1: nStr(1024),
  Additional2: nStr(1024)
});

// PATCH: all fields optional
export const applicationPatchSchema = applicationBase
  .partial()
  .refine((v) => (v.IssueDate && v.ExpiryDate ? v.IssueDate <= v.ExpiryDate : true), {
    message: "IssueDate must be <= ExpiryDate",
    path: ["IssueDate"]
  })
  .refine((v) => (v.ArrivalDate && v.DepartureDate ? v.ArrivalDate <= v.DepartureDate : true), {
    message: "ArrivalDate must be <= DepartureDate",
    path: ["ArrivalDate"]
  })
  .refine((v) => v.DocumentNumber == null || v.TravelDocumentType != null, {
    message: "TravelDocumentType is required when DocumentNumber is provided",
    path: ["TravelDocumentType"]
  });

export type ApplicationPatchInput = z.infer<typeof applicationPatchSchema>;
