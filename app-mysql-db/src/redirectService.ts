import { getRecord } from "./db.ts";

export async function getShortenedUrl(id: string) {
  const rec = await getRecord(id);
  if (!rec) {
    throw new Deno.errors.NotFound();
  }
  return rec.originalUrl;
}
