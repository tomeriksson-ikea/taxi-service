import { MongoClient, ServerApiVersion } from "mongodb";

interface Db {
  collection: (name: string) => Collection;
}

interface Collection {
  insertOne: (doc: any) => Promise<void>;
}

export class MongoDBService {
  readonly client: MongoClient;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  db(dbName: string): Db {
    return {
      collection: (collName: string) => {
        return {
          insertOne: async (doc: any) => {
            const res = await this.client
              .db(dbName)
              .collection(collName)
              .insertOne(doc);
            if (!res.acknowledged) {
              throw new Error("Failed to insertOne");
            }
          }
        };
      }
    };
  }
}
