import process from "process";

export class Config {
  private readonly mongodbConnectionString: string;
  constructor() {
    if (process.env.NODE_ENV === "test") {
      this.mongodbConnectionString = process.env.MONGO_URL as string;
    } else {
      this.mongodbConnectionString =
        process.env.MONGO_DB_CONNECTION_URL || "mongodb://mongodb:27017";
    }
  }
  getMongoDBConnectionString(): string {
    return this.mongodbConnectionString;
  }
}
