import { access, mkdir } from "fs/promises";
import { constants } from "fs";

export default async function assert(dir: string) {
  try {
    await access(dir, constants.F_OK);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}
