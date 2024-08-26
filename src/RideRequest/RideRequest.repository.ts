import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { RideRequest, RideRequestData } from "./RideRequest";
import { RawEntity } from "../Common/Entity";
import { Repository } from "../Common/Repository";

export class RideRequestRepository implements Repository {
  private readonly client: MongoClient;
  private readonly rideRequests: Collection<RawEntity<RideRequestData>>;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
    this.rideRequests = this.client
      .db("taxi-service")
      .collection("ride-requests");
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  async create(rideRequest: RideRequest): Promise<RideRequest> {
    const res = await this.rideRequests.insertOne(rideRequest.toRaw());
    if (!res.acknowledged) {
      throw new Error("Could not create ride request");
    }
    return rideRequest;
  }

  async get(id: string): Promise<RideRequest> {
    const rideRequest = await this.rideRequests.findOne({ id });
    if (!rideRequest) {
      throw new Error("Ride request not found");
    }
    return RideRequest.createFromRaw(rideRequest);
  }

  async update(rideRequest: RideRequest): Promise<RideRequest> {
    const rawRideRequest = await this.rideRequests.replaceOne(
      { id: rideRequest.getId() },
      rideRequest.toRaw()
    );
    if (!rawRideRequest.acknowledged) {
      throw new Error("Could not update ride request");
    }
    return rideRequest;
  }
}
