import { RideRequest } from "./RideRequest";
import { MongoDBService } from "../Services/MongoDB.service";
import { RideRequestError } from "../Common/Errors";

export class RideRequestRepository {
  private mongodb: MongoDBService;

  constructor(mongodb: MongoDBService) {
    this.mongodb = mongodb;
  }

  async add(rideRequest: RideRequest): Promise<RideRequest> {
    try {
      await this.mongodb
        .db("taxi-service")
        .collection("ride-requests")
        .insertOne(rideRequest);
      return rideRequest;
    } catch (e) {
      throw new RideRequestError("Failed to create ride request", rideRequest);
    }
  }
}
