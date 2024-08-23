import { agent } from "supertest";
import { Express } from "express";
import { RideRequest } from "./RideRequest";
import { Client } from "../Client/Client";
import { Fleet } from "../Fleet/Fleet";
import { Bid } from "../Bid/Bid";
import { setupApp } from "../App";
import { purgeMongoDB } from "../../test/MongoDB.setup";

describe("RideRequest", () => {
  let app: Express;
  beforeEach(async () => {
    app = await setupApp();
  });

  afterEach(purgeMongoDB);

  it("should submit and return a new RideRequest", async () => {
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const rideRequestBody = {
      client,
      pickupLocation: "123 Main St",
      dropoffLocation: "456 Elm St",
      proposedPrice: 50
    };

    const res = await agent(app)
      .post("/ride-requests")
      .send(rideRequestBody);

    expect(res.status).toBe(201);

    const expectedResponse = {
      _id: expect.any(String),
      bids: [],
      ...rideRequestBody
    };
    expect(res.body).toEqual(expectedResponse);
  });

  it("should list ride requests", async () => {
    // Create a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const rideRequestBody = {
      client,
      pickupLocation: "123 Main St",
      dropoffLocation: "456 Elm St",
      proposedPrice: 50
    };

    await agent(app)
      .post("/ride-requests")
      .send(rideRequestBody);

    // List ride requests
    const res = await agent(app)
      .get("/ride-requests")
      .send();

    const expectedResponseBody = {
      _id: expect.any(String),
      bids: [],
      ...rideRequestBody
    };

    expect(res.body).toEqual([expectedResponseBody]);
    expect(res.status).toBe(200);
  });

  it("should place bid on ride request by fleet", async () => {
    // Create a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");
    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    const submittedRideRequest = await agent(app)
      .post("/ride-requests")
      .send(rideRequest);

    // Create a fleet
    const fleet = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    // Place bid on ride request
    const res = await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send({ fleet, bidAmount: 50 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      _id: expect.any(String),
      accepted: false,
      bidAmount: 50,
      fleet: {
        email: "john.doe@email.com",
        name: "Johns Taxi fleet",
        phone: "1234567890"
      }
    });
  });

  it("should list bids for a ride request", async () => {
    // Submit a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const submittedRideRequest = await agent(app)
      .post("/ride-requests")
      .send({
        client,
        pickupLocation: "123 Main St",
        dropoffLocation: "456 Elm St",
        proposedPrice: 50
      });

    // Create fleets
    const fleetA = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const fleetB = new Fleet(
      "Janes Taxi fleet",
      "jane.doe@email.com",
      "1234567890"
    );

    // Place bids on ride request
    await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send({ fleet: fleetA, bidAmount: 50 });

    await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send({ fleet: fleetB, bidAmount: 60 });

    const res = await agent(app)
      .get(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        _id: expect.any(String),
        accepted: false,
        bidAmount: 50,
        fleet: {
          email: "john.doe@email.com",
          name: "Johns Taxi fleet",
          phone: "1234567890"
        }
      },
      {
        _id: expect.any(String),
        accepted: false,
        bidAmount: 60,
        fleet: {
          email: "jane.doe@email.com",
          name: "Janes Taxi fleet",
          phone: "1234567890"
        }
      }
    ]);
  });

  it("should accept a placed bid on a ride request", async () => {
    // Submit a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    const submittedRideRequest = await agent(app)
      .post("/ride-requests")
      .send(rideRequest);

    // Create fleets
    const fleetA = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const fleetB = new Fleet(
      "Janes Taxi fleet",
      "jane.doe@email.com",
      "1234567890"
    );

    // Create bids
    const bidA = new Bid(fleetA, 60);
    const bidB = new Bid(fleetB, 50);

    // Place bids on ride request
    await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send(bidA);

    await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send(bidB);

    const listBidsRes = await agent(app)
      .get(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send();

    // Accept a bid
    const rideRequestId = submittedRideRequest.body._id;
    const bidBId = listBidsRes.body[1]._id;

    const res = await agent(app)
      .put(`/ride-requests/${rideRequestId}/bids/${bidBId}/accept`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.accepted).toEqual(true);
  });

  it("should close the bidding when a ride request bid is accepted", async () => {
    // Submit a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    const submittedRideRequest = await agent(app)
      .post("/ride-requests")
      .send(rideRequest);

    // Create a fleet
    const fleetA = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const firstBid = new Bid(fleetA, 60);

    // Place bid on ride request
    const firstBidRes = await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send(firstBid);

    // Accept a bid
    await agent(app)
      .put(
        `/ride-requests/${submittedRideRequest.body._id}/bids/${firstBidRes.body._id}/accept`
      )
      .send();

    const fleetB = new Fleet(
      "Janes Taxi fleet",
      "jane.doe@email.com",
      "1234567890"
    );
    // Place another bid
    const secondBid = new Bid(fleetB, 50);

    const secondBidRes = await agent(app)
      .post(`/ride-requests/${submittedRideRequest.body._id}/bids`)
      .send(secondBid);

    expect(secondBidRes.status).toBe(400);
    expect(secondBidRes.body).toEqual({
      error: "Bidding is closed for this ride request"
    });
  });
});
