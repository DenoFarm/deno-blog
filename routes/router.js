import { Router } from "../dependencies.js";

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

export { router };