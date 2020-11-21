import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { create, verify, decode } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { parseBody } from "../utils/parseBody.js";
import { users } from "../database.js";

function ifObjectIsEmpty(object){
  var isEmpty=true;
  if(JSON.stringify(object)==JSON.stringify({})){
    // Object is Empty
    isEmpty = true;
  }
  else{
    //Object is Not Empty
    isEmpty = false;
  }
  return isEmpty;
}

export const signUp = async({request, response, cookies}) => {
  console.log(request);
  if (request.auth) {
    cookies.set("message", `You are already signed in!`)
    response.redirect("/");
  } else {
    if (ifObjectIsEmpty) {
      response.body = "Something went wrong!";
    }
    const body = parseBody(await request.body());
    const find = await users.findOne({username: body.value.username});
    if (find) {
      cookies.set("message", `Username already exists!`)
      response.redirect("/signup");
    } else {
      try {
        let user = await users.insertOne({
          username: body.value.username,
          password: await bcrypt.hash(body.value.password),
        });
        cookies.set("message", `Successfully registered as ${body.value.username}!`);
        response.redirect("/");
      } catch(error) {
        console.log(error);
      }
    }
  }
}