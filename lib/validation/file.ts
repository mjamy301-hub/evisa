import { FileIdentifier } from "@/utils/enum";
import { z } from "zod";

export const uploadSchemaSchema = z.object({
  Identifier: z.enum(FileIdentifier),
  FileableId: z.string()
});
