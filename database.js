import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts"
import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

const client = new MongoClient();
client.connectWithUri(config().MONGODB_CONNECTION_KEY);

const database = client.database("test");

const users = database.collection("users");


export {database, users};