import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { Fleet, FleetProps } from "./Fleet";
import { RawEntity } from "../Entity";
import { Repository } from "../Repository";

export class FleetRepository implements Repository {
  private readonly client: MongoClient;
  private readonly fleets: Collection<RawEntity<FleetProps>>;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    this.fleets = this.client.db("taxi-service").collection("fleets");
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  async create(fleet: Fleet): Promise<Fleet> {
    await this.fleets.insertOne(fleet.toRaw());
    return fleet;
  }
}
