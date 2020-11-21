import { Router } from "https://deno.land/x/oak/mod.ts";
import { handle} from "../utils/handlebars.ts";
import { create, verify, decode } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";


const JWT_PARAMS = {
  JWT_KEY: config().SECRET_JWT_AUTH_KEY,
  one_year: 60 * 60 * 24 * 365,
  EXPIRATION: { exp: Date.now() / 1000 + 60 * 60 * 24 * 365},
}

const router = new Router();
router
  .get('/', async (context) => {
    context.response.body = await handle.renderView('tutorials_list', {name : "Shyngys"})
  })
  .get("/newJWT", async (context) => {
    let jwt = await create({ alg: "HS512", typ: "JWT"}, {username: "user1"},  JWT_PARAMS.JWT_KEY);
    context.response.body = jwt;
    context.cookies.set("token", jwt);
  })
  .get("/validate", async (context) => {
    let token = context.cookies.get("token");
    if (token) {
      const payload = await verify(token, JWT_PARAMS.JWT_KEY, "HS512");
      payload ? context.response.body = "Valid Jwt" : context.response.body = "Invalid Jwt";
      return; // { foo: "bar" }
    }
    context.response.body = "No token in cookies";
  })

export { router };