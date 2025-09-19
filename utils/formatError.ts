import { ZodError } from "zod";

export function formatErrors(error: ZodError) {
  const formatted: Record<string, string | string[]> = { _errors: [] };

  for (const issue of error.issues) {
    const path = issue.path[0] as string | undefined;
    if (path) {
      // If multiple errors per field, join them
      formatted[path] = formatted[path]
        ? ([] as string[]).concat(formatted[path] as string, issue.message)
        : issue.message;
    } else {
      (formatted._errors as string[]).push(issue.message);
    }
  }

  return formatted;
}
