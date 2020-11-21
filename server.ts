import { Application } from "https://deno.land/x/oak/mod.ts";
import { router } from "./routes/routes.ts";


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server is running 🦕")
await app.listen({ port: 8000 });
