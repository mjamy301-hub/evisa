import { z } from "zod";

// empty string -> null for optional inputs
export const toNull = (v: unknown) => (v === "" || v === undefined ? null : v);

// Date coercion with empty string support
export const nullableDate = z.preprocess(toNull, z.coerce.date().nullable());

// Int coercion for Phone fields (your model uses Int?)
// Consider switching to string in DB, but this matches your schema now.
export const nullableInt = z.preprocess(toNull, z.coerce.number().int().positive().nullable());

// Common bounded strings
export const nStr = (max: number) => z.preprocess(toNull, z.string().trim().max(max).nullable());

export const nullableEmail = z.preprocess(toNull, z.email().max(254).nullable());
