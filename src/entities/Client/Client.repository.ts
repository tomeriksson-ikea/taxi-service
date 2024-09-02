import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { Client, ClientProps } from "./Client";
import { RawEntity } from "../common/Entity";
import { Repository } from "../common/Repository";

export class ClientRepository implements Repository {
  private readonly client: MongoClient;
  private readonly clients: Collection<RawEntity<ClientProps>>;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    this.clients = this.client.db("taxi-service").collection("clients");
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  async create(client: Client): Promise<Client> {
    await this.clients.insertOne(client.toRaw());
    return client;
  }
}
