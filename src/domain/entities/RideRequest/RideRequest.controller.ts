import { RideRequestRepository } from "./RideRequest.repository";
import { RideRequest } from "./RideRequest";
import { Bid } from "../Bid/Bid";

export class RideRequestController {
  private readonly repository: RideRequestRepository;

  constructor(repository: RideRequestRepository) {
    this.repository = repository;
  }

  getRideRequest = async (id: string): Promise<RideRequest> => {
    return this.repository.get(id);
  };

  createRideRequest = async (reqBody: any): Promise<RideRequest> => {
    const rideRequest = RideRequest.create(reqBody);
    return this.repository.create(rideRequest);
  };

  placeBidOnRideRequest = async (
    rideRequestId: string,
    bidReqBody: any
  ): Promise<Bid> => {
    const rideRequest = await this.repository.get(rideRequestId);
    const bid = Bid.create(bidReqBody);

    rideRequest.addBid(bid);

    await this.repository.update(rideRequest);

    return bid;
  };

  acceptRideRequestBid = async (
    rideRequestId: string,
    bidId: string
  ): Promise<Bid> => {
    const rideRequest = await this.repository.get(rideRequestId);

    rideRequest.acceptBid(bidId);

    await this.repository.update(rideRequest);

    return rideRequest.getBid(bidId);
  };
}
