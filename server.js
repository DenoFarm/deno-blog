import { 
  Application, 
  Router, 
  send 
}                              from "./dependencies.js";
import { multiParser }         from "./dependencies.js";
import {
  viewEngine,
  engineFactory,
  adapterFactory
}                              from "./dependencies.js";


const ejsEngine = await engineFactory.getEjsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

const app = new Application();

app.use(viewEngine(oakAdapter,ejsEngine));

app.use(async (ctx,next) => {
  await send(ctx, ctx.request.url.pathname,{
    root: `${Deno.cwd()}/static`
  });
  next();
});


const router = new Router();

router
  .get("/", async (context) => {
    context.render(`${Deno.cwd()}/views/index.ejs`);
  })
  .get("/register", async (context) => {
    // context.response.body = await renderFileToString(
    //   `${Deno.cwd()}/views/pages/authorization/registration.ejs`
    // );
  })
  .post("/register", async (context) => {
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    console.log(parse["fields"]["username"]);
    context.response.redirect("/")
  })
  .get("/login", async (context) => {
    // context.response.body = await renderFileToString(
    //   `${Deno.cwd()}/views/pages/authorization/login.ejs`
    // );
  })
  .post("/login", async (context) => {
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    console.log(parse["fields"]["username"]);
    context.response.redirect("/")
  });

/*
When I enable lines below it gives an error when I try to enable static files.
When I disable no error and pages work too.
I think it's a bug of oak.
*/
// app.addEventListener('error', event => {
//   console.log(event.error);
// });

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running 🦕")
await app.listen({ port: 8000 });
