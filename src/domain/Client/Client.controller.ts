import { Client } from "./Client";
import { ClientRepository } from "../../repositories/Client.repository";

export class ClientController {
  private readonly repository: ClientRepository;

  constructor(repository: ClientRepository) {
    this.repository = repository;
  }

  createClient = async (reqBody: any): Promise<Client> => {
    const client = Client.create(reqBody);

    return this.repository.create(client);
  };
}
