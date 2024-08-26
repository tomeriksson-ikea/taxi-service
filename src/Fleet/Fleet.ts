import { Entity } from "../Common/Entity";

export interface FleetProps {
  name: string;
  email: string;
  phone: string;
}

export class Fleet extends Entity<FleetProps> {
  constructor(data: FleetProps, id?: string) {
    super(data, id);
  }
}
