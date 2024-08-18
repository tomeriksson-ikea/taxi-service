import { Client } from "../Client/Client";

export class RideRequest {
  private client: Client;
  private pickupLocation: string;
  private dropoffLocation: string;
  private proposedPrice: number;

  constructor(
    client: Client,
    pickupLocation: string,
    dropoffLocation: string,
    proposedPrice: number
  ) {
    this.client = client;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.proposedPrice = proposedPrice;
  }
}
