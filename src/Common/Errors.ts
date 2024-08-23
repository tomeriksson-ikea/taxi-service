import { RideRequest } from "../RideRequest/RideRequest";

export class RideRequestError extends Error {
  private rideRequest?: RideRequest;
  constructor(message: string, rideRequest?: RideRequest) {
    super(message);
    this.name = "RideRequestError";
    this.rideRequest = rideRequest;
  }
}
