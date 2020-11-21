import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts"
import { config } from "https://deno.land/x/dotenv@v1.0.1/mod.ts";

const client = new MongoClient();
client.connectWithUri(config().MONGODB_CONNECTION_KEY);

export const db = client.database("test");

export const users = await db.collection("users");
