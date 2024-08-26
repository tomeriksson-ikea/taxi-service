import { MongoClient } from "mongodb";
import { Config } from "../src/application/config";

export const purgeMongoDB = async () => {
  const config = new Config();
  const client = await new MongoClient(
    config.getMongoDBConnectionString()
  ).connect();

  await client.db("taxi-service").dropDatabase();
};
