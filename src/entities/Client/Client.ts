import { Entity, RawEntity } from "../common/Entity";

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
}

export type ClientData = ClientProps;

export class Client extends Entity<ClientProps> {
  protected constructor(data: ClientProps, id?: string) {
    super(data, id);
  }

  static create(props: ClientProps): Client {
    return new Client(props);
  }

  static createFromRaw(props: RawEntity<ClientData>): Client {
    return new Client(props.data, props.id);
  }
}
