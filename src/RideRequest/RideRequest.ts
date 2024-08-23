import { Client } from "../Client/Client";
import { Bid } from "../Bid/Bid";
import { Identifiable } from "../Common/Identifiable";

export class RideRequest extends Identifiable {
  private client: Client;
  private pickupLocation: string;
  private dropoffLocation: string;
  private proposedPrice: number;
  private readonly bids: Bid[] = [];

  constructor(
    client: Client,
    pickupLocation: string,
    dropoffLocation: string,
    proposedPrice: number,
    bids?: Bid[]
  ) {
    super();
    this.client = client;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.proposedPrice = proposedPrice;
    if (bids) {
      this.bids = bids.map(
        bid => new Bid(bid.fleet, bid.bidAmount, bid.accepted)
      );
    }
  }

  addBid(bid: Bid) {
    if (this.bids.some(b => b.getFleet().equals(bid.getFleet()))) {
      throw new Error("Fleet already placed a bid");
    }
    this.bids.push(bid);
  }

  getBids(): Bid[] {
    return this.bids;
  }

  hasAcceptedBid(): boolean {
    return this.bids.some(bid => bid.accepted);
  }
}
