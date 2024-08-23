import { RideRequest } from "./RideRequest";
import { RideRequestError } from "../Common/Errors";
import { Bid } from "../Bid/Bid";
import { Collection, MongoClient, ServerApiVersion } from "mongodb";

export class RideRequestRepository {
  private readonly client: MongoClient;
  private readonly rideRequests: Collection<RideRequest>;

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

  async add(rideRequest: RideRequest): Promise<RideRequest> {
    const docWithRemovedRefs = Object.assign({}, rideRequest);
    const res = await this.rideRequests.insertOne(docWithRemovedRefs);
    if (!res.acknowledged) {
      throw new RideRequestError("Failed to add ride request", rideRequest);
    }
    return rideRequest;
  }

  async addBid(rideRequestId: string, bid: Bid): Promise<Bid> {
    const docWithRemovedRefs = Object.assign({}, bid);
    try {
      await this.rideRequests.updateOne(
        {
          _id: rideRequestId
        },
        { $push: { bids: docWithRemovedRefs } }
      );
      return bid;
    } catch (e) {
      throw new RideRequestError("Failed to add bid to ride request");
    }
  }

  async list(): Promise<RideRequest[]> {
    try {
      const rideRequestDocuments = await this.rideRequests
        .find({})
        .project({ _id: 0, "bids._id": 0 })
        .toArray();
      return rideRequestDocuments.map(
        document =>
          new RideRequest(
            document.client,
            document.pickupLocation,
            document.dropoffLocation,
            document.proposedPrice,
            document.bids
          )
      );
    } catch (e) {
      throw new RideRequestError("Failed to list ride requests");
    }
  }

  async get(id: string): Promise<RideRequest | null> {
    try {
      const rideRequest: any = await this.rideRequests.findOne({ _id: id });
      if (!rideRequest) return null;

      return new RideRequest(
        rideRequest.client,
        rideRequest.pickupLocation,
        rideRequest.dropoffLocation,
        rideRequest.proposedPrice,
        rideRequest.bids
      );
    } catch (e) {
      throw new RideRequestError("Failed to get ride request");
    }
  }

  async acceptBid(rideRequestId: string, bidId: string): Promise<void> {
    try {
      await this.rideRequests.updateOne(
        { _id: rideRequestId, "bids._id": bidId },
        { $set: { "bids.$.accepted": true } }
      );
    } catch (e) {
      throw new RideRequestError("Failed to accept bid on ride request");
    }
  }
}
