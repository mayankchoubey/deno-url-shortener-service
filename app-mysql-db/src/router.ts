import { Application, Context, Router } from "../deps.ts";
import cfg from "../cfg.json" assert { type: "json" };
import { shorten } from "./shortenController.ts";
import { redirect } from "./redirectController.ts";

export async function start() {
  const router = new Router();
  router
    .get("/", (ctx) => ctx.response.redirect("./index.html"))
    .get("/index.html", (ctx) => sendLandingPage(ctx))
    .post("/shorten", (ctx) => shorten(ctx))
    .get("/:shortId", (ctx) => redirect(ctx))
    .post("/:shortId", (ctx) => redirect(ctx));

  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log(`Starting server on ${cfg.serverPort}`);
  await app.listen(`${cfg.shortenedDomain}:${cfg.serverPort}`);
}

async function sendLandingPage(ctx: Context) {
  ctx.response.body = await Deno.readFile("./public/index.html");
  ctx.response.headers.set("Content-Type", "text/html");
}
