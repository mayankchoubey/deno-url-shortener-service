import { shortenUrl } from "./shortenService.ts";

export async function shorten(ctx: any) {
  const urlToShorten = ctx.request.url.searchParams.get("urlToShorten");
  if (!urlToShorten) {
    ctx.response.status = 400;
    ctx.response.body = { errMsg: "URL to shorten is missing" };
    return;
  }
  try {
    const shortenedUrl = await shortenUrl(urlToShorten);
    ctx.response.status = 201;
    ctx.response.body = { shortenedUrl };
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = { errMsg: e.message };
  }
}
