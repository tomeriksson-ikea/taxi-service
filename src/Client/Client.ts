import { Entity } from "../Common/Entity";

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
}

export class Client extends Entity<ClientProps> {
  constructor(data: ClientProps, id?: string) {
    super(data, id);
  }
}
