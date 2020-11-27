import { Application, Router } from "./dependencies.js";
import { renderFileToString }  from "./dependencies.js";
import { multiParser }         from "./dependencies.js";


const app = new Application();
const router = new Router();

router
  .get("/register", async (context) => {
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/index.ejs`
    );
  })
  .post("/register", async (context) => {
    // const value = await context.request.serverRequest;
    // // const username = value.get("username");
    // console.log(`Value: ${JSON.stringify(value)}`);
    // context.response.redirect("/register");
    const form = JSON.stringify(await multiParser(context.request.serverRequest));
    const parse = JSON.parse(form);
    console.log(parse["fields"]["username"]);
    context.response.redirect("/register")
  });

app.addEventListener('error', event => {
  console.log(event.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running 🦕")
await app.listen({ port: 8000 });
