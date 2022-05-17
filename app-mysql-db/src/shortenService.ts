import { addRecord } from "./db.ts";
import { ShortenedData, URL_SIZE } from "./consts.ts";
import { getRandomString } from "../deps.ts";
import cfg from "../cfg.json" assert { type: "json" };

export async function shortenUrl(originalUrl: string): Promise<string> {
  const shortId = await getRandomString(URL_SIZE);
  const targetUrl = `http://${cfg.shortenedDomain}/${shortId}`;
  const dbRec: ShortenedData = { originalUrl, targetUrl };
  await addRecord(shortId, dbRec);
  return targetUrl;
}
