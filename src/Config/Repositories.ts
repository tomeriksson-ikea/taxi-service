import { RideRequestRepository } from "../RideRequest/RideRequest.repository";
import { Config } from "./Config";

export class Repositories {
  private readonly rideRequestRepository: RideRequestRepository;
  constructor(config: Config) {
    this.rideRequestRepository = new RideRequestRepository(
      config.getMongoDBConnectionString()
    );
  }

  getRideRequestRepository(): RideRequestRepository {
    return this.rideRequestRepository;
  }
}
