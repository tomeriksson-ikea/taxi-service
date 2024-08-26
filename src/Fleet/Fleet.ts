import { Entity, RawEntity } from "../Common/Entity";

export interface FleetProps {
  name: string;
  email: string;
  phone: string;
}

export type FleetData = FleetProps;

export class Fleet extends Entity<FleetProps> {
  protected constructor(data: FleetProps, id?: string) {
    super(data, id);
  }

  static create(props: FleetProps): Fleet {
    return new Fleet(props);
  }

  static createFromRaw(props: RawEntity<FleetData>): Fleet {
    return new Fleet(props.data, props.id);
  }
}
