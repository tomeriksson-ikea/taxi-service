import { FleetRepository } from "./Fleet.repository";
import { Fleet } from "./Fleet";

export class FleetController {
  private readonly repository: FleetRepository;
  constructor(repository: FleetRepository) {
    this.repository = repository;
  }

  async createFleet(reqBody: any): Promise<Fleet> {
    const fleet = Fleet.create(reqBody);
    return this.repository.create(fleet);
  }
}
