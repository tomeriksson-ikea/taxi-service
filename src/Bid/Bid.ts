import { Fleet } from "../Fleet/Fleet";

export class Bid {
  private fleet: Fleet;
  private bidAmount: number;
  private accepted: boolean = false;

  constructor(fleet: Fleet, bidAmount: number) {
    this.fleet = fleet;
    this.bidAmount = bidAmount;
  }

  accept() {
    this.accepted = true;
  }

  isAccepted() {
    return this.accepted;
  }
}
