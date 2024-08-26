import { Entity, RawEntity } from "../Entity";
import { ClientProps } from "../Client/Client";
import { Bid, BidData } from "../Bid/Bid";

export type RideRequestProps = {
  client: ClientProps;
  pickupLocation: string;
  dropoffLocation: string;
  proposedPrice: number;
};

export type RideRequestData = RideRequestProps & {
  bids: RawEntity<BidData>[];
};

export class RideRequest extends Entity<RideRequestData> {
  private bids: Bid[];

  protected constructor(data: RideRequestData, id?: string) {
    super(data, id);
    this.bids = data.bids.map(Bid.createFromRaw);
  }

  static create(props: RideRequestProps): RideRequest {
    return new RideRequest({ ...props, bids: [] });
  }

  static createFromRaw(props: RawEntity<RideRequestData>): RideRequest {
    return new RideRequest(props.data, props.id);
  }

  addBid(bid: Bid) {
    if (this.hasAcceptedBid()) {
      throw new Error("Cannot add bid to ride request with accepted bid");
    }
    this.bids.push(bid);
  }

  private hasAcceptedBid(): boolean {
    return this.bids.some(bid => bid.isAccepted());
  }

  acceptBid(bidId: string) {
    this.getBid(bidId).accept();
  }

  getBid(bidId: string) {
    const bid = this.bids.find(bid => bid.getId() === bidId);
    if (!bid) {
      throw new Error("Bid not found on ride request");
    }
    return bid;
  }

  toRaw(): RawEntity<RideRequestData> {
    return {
      id: this.id,
      data: {
        ...this.data,
        bids: this.bids.map(bid => bid.toRaw())
      }
    };
  }
}
