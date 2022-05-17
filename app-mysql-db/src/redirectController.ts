import { getShortenedUrl } from "./redirectService.ts";

export async function redirect(ctx: any) {
  try {
    const shortenedUrl = await getShortenedUrl(ctx.params.shortId);
    ctx.response.redirect(shortenedUrl);
  } catch (e) {
    ctx.response.status = 500;
    if (e instanceof Deno.errors.NotFound) {
      ctx.response.body = {
        errMsg: "Provided URL is not a valid shortened URL",
      };
    }
  }
}
