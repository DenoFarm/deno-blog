import { Application } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { router } from "./routes/routes.js";


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener('error', event => {
  console.log(event.error);
})
console.log("Server is running 🦕")
app.listen({ port: 8000 });
