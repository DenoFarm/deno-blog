import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.12.1/mod.ts";
const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

try {
  const db = client.database("test");
  const users = db.collection<UserSchema>("users");

  // const user1 = await users.insertOne({
  //   username: "user1",
  //   password: "pass1",
  // });

  const foundUser = await users.findOne({ username: "user1" });
  if (foundUser) {
    console.log(foundUser); // returns full document (if found) { _id: { "$oid": "5f85b594006a29e1009d9053" }, username: "user1", password: "pass1" }
  }
} catch (e) {
  console.error(e);
}

