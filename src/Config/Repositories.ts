import { RideRequestRepository } from "../RideRequest/RideRequest.repository";
import { ClientRepository } from "../Client/Client.repository";
import { FleetRepository } from "../Fleet/Fleet.repository";
import { Config } from "./Config";

export class Repositories {
  private readonly rideRequestRepository: RideRequestRepository;
  private readonly clientRepository: ClientRepository;
  private readonly fleetRepository: FleetRepository;

  constructor(config: Config) {
    this.rideRequestRepository = new RideRequestRepository(
      config.getMongoDBConnectionString()
    );

    this.clientRepository = new ClientRepository(
      config.getMongoDBConnectionString()
    );

    this.fleetRepository = new FleetRepository(
      config.getMongoDBConnectionString()
    );
  }

  getRideRequestRepository(): RideRequestRepository {
    return this.rideRequestRepository;
  }

  getClientRepository(): ClientRepository {
    return this.clientRepository;
  }

  getFleetRepository(): FleetRepository {
    return this.fleetRepository;
  }
}
