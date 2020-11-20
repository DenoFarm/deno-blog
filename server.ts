import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Welcome to / route";
  })
  .get("/anything", (context) => {
    context.response.body = "Welcome to /anything route";
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });