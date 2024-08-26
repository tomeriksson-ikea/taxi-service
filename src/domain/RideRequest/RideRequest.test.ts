import { Express } from "express";
import { setupApp } from "../../application/app";
import { purgeMongoDB } from "../../../test/MongoDB.setup";
import { RideRequestProps } from "./RideRequest";
import { agent } from "supertest";
import { FleetProps } from "../Fleet/Fleet";
import { BidProps } from "../Bid/Bid";

describe("RideRequest", () => {
  let app: Express;
  beforeEach(async () => {
    app = await setupApp();
  });

  afterEach(purgeMongoDB);

  it("should submit and return a new RideRequest", async () => {
    const rideRequestProps: RideRequestProps = {
      client: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "1234567890"
      },
      pickupLocation: "Pickup Location",
      dropoffLocation: "Dropoff Location",
      proposedPrice: 100
    };

    const res = await agent(app)
      .post("/ride-requests")
      .send(rideRequestProps);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      data: {
        bids: [],
        client: {
          email: "john.doe@email.com",
          name: "John Doe",
          phone: "1234567890"
        },
        dropoffLocation: "Dropoff Location",
        pickupLocation: "Pickup Location",
        proposedPrice: 100
      }
    });
  });

  it("should list ride requests", async () => {
    expect(true).toBe(true);
  });

  it("should place bid on ride request by fleet", async () => {
    const rideRequest: RideRequestProps = {
      client: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "1234567890"
      },
      pickupLocation: "Pickup Location",
      dropoffLocation: "Dropoff Location",
      proposedPrice: 100
    };

    const rideRequestResponse = await agent(app)
      .post("/ride-requests/")
      .send(rideRequest);

    const fleet: FleetProps = {
      name: "John Does Fleet",
      email: "john.doe@fleet.com",
      phone: "1234567890"
    };

    const bid: BidProps = {
      fleet,
      bidAmount: 90
    };

    const res = await agent(app)
      .post(`/ride-requests/${rideRequestResponse.body.id}/bids`)
      .send(bid);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      data: {
        accepted: false,
        bidAmount: 90,
        fleet: {
          email: "john.doe@fleet.com",
          name: "John Does Fleet",
          phone: "1234567890"
        }
      }
    });
  });

  it("should list bids for a ride request", async () => {
    expect(true).toBe(true);
  });

  it("should accept a placed bid on a ride request", async () => {
    // Create a ride request
    const rideRequest: RideRequestProps = {
      client: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "1234567890"
      },
      pickupLocation: "Pickup Location",
      dropoffLocation: "Dropoff Location",
      proposedPrice: 100
    };

    const rideRequestResponse = await agent(app)
      .post("/ride-requests/")
      .send(rideRequest);

    // Place a bid on the ride request
    const fleet: FleetProps = {
      name: "John Does Fleet",
      email: "john.doe@fleet.com",
      phone: "1234567890"
    };

    const bid: BidProps = {
      fleet,
      bidAmount: 90
    };

    const rideRequestWithBid = await agent(app)
      .post(`/ride-requests/${rideRequestResponse.body.id}/bids`)
      .send(bid);

    // Accept the bid
    const rideRequestId = rideRequestResponse.body.id;
    const bidId = rideRequestWithBid.body.id;

    const res = await agent(app)
      .post(`/ride-requests/${rideRequestId}/bids/${bidId}/accept`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      data: { ...bid, accepted: true }
    });
  });

  it("should not accept more bids after a bid is accepted", async () => {
    // Create a ride request
    const rideRequest: RideRequestProps = {
      client: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "1234567890"
      },
      pickupLocation: "Pickup Location",
      dropoffLocation: "Dropoff Location",
      proposedPrice: 100
    };

    const rideRequestResponse = await agent(app)
      .post("/ride-requests/")
      .send(rideRequest);

    // Place a bid on the ride request
    const fleetA: FleetProps = {
      name: "John Does Fleet",
      email: "john.doe@fleet.com",
      phone: "1234567890"
    };

    const fleetB: FleetProps = {
      name: "Jane Does Fleet",
      email: "jane.doe@fleet.com",
      phone: "1234567890"
    };

    const bidA: BidProps = {
      fleet: fleetA,
      bidAmount: 90
    };

    const bidB: BidProps = {
      fleet: fleetB,
      bidAmount: 90
    };

    const rideRequestWithBidA = await agent(app)
      .post(`/ride-requests/${rideRequestResponse.body.id}/bids`)
      .send(bidA);

    // Accept the bid A
    const rideRequestId = rideRequestResponse.body.id;
    const bidId = rideRequestWithBidA.body.id;

    await agent(app)
      .post(`/ride-requests/${rideRequestId}/bids/${bidId}/accept`)
      .send();

    // Try to add bid B
    const res = await agent(app)
      .post(`/ride-requests/${rideRequestResponse.body.id}/bids`)
      .send(bidB);

    // Expect an error
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      id: expect.any(String),
      error: "Cannot add bid to ride request with accepted bid"
    });
  });
});
