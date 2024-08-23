import { Fleet } from "../Fleet/Fleet";
import { Identifiable } from "../Common/Identifiable";

export class Bid extends Identifiable {
  readonly fleet: Fleet;
  readonly bidAmount: number;
  readonly accepted: boolean = false;

  constructor(fleet: Fleet, bidAmount: number, accepted?: boolean) {
    super();
    this.fleet = new Fleet(fleet.name, fleet.email, fleet.phone);
    this.bidAmount = bidAmount;
    if (accepted) {
      this.accepted = accepted;
    }
  }

  getFleet() {
    return this.fleet;
  }
}
