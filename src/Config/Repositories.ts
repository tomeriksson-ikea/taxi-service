import { Services } from "./Services";
import { RideRequestRepository } from "../RideRequest/RideRequest.repository";

export class Repositories {
  private services: Services;
  private readonly rideRequestRepository: RideRequestRepository;
  constructor(services: Services) {
    this.services = services;

    this.rideRequestRepository = new RideRequestRepository(
      services.getMongoDB()
    );
  }

  getRideRequestRepository(): RideRequestRepository {
    return this.rideRequestRepository;
  }
}
