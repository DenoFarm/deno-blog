import { Application, Router } from "./dependencies.js";
import { renderFileToString }  from "./dependencies.js";
import { multiParser }         from "./dependencies.js";


const app = new Application();
const router = new Router();

router
  .get("/", async (context) => {
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/index.ejs`
    );
  })
  .get("/register", async (context) => {
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/pages/authorization/registration.ejs`
    );
  })
  .post("/register", async (context) => {
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    console.log(parse["fields"]["username"]);
    context.response.redirect("/")
  })
  .get("/login", async (context) => {
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/pages/authorization/login.ejs`
    );
  })
  .post("/login", async (context) => {
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    console.log(parse["fields"]["username"]);
    context.response.redirect("/")
  });

app.addEventListener('error', event => {
  console.log(event.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running 🦕")
await app.listen({ port: 8000 });
