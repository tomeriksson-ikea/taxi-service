import { Entity, RawEntity } from "../Common/Entity";
import { FleetProps } from "../Fleet/Fleet";

export type BidData = {
  readonly fleet: FleetProps;
  readonly bidAmount: number;
  accepted: boolean;
};

export type BidProps = Omit<BidData, "accepted">;

export class Bid extends Entity<BidData> {
  protected constructor(data: BidData, id?: string) {
    super(data, id);
  }

  static create(props: BidProps): Bid {
    return new Bid({ ...props, accepted: false });
  }

  static createFromRaw(props: RawEntity<BidData>): Bid {
    return new Bid(props.data, props.id);
  }

  accept() {
    this.data.accepted = true;
  }

  isAccepted() {
    return this.data.accepted;
  }
}
