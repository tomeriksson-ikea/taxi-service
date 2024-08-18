import request = require("supertest");
import { app } from "../server";
import { RideRequest } from "./RideRequest";
import { Client } from "../Client/Client";
import { Fleet } from "../Fleet/Fleet";
import { Bid } from "../Bid/Bid";

describe("RideRequest", () => {
  it("should submit and return a new RideRequest", async () => {
    const client = new Client("John Doe", "john.doe@email.com", "123");
    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    const res = await request(app)
      .post("/ride-requests")
      .send(rideRequest);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(rideRequest);
  });

  it("should list ride requests", async () => {
    // Create a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");
    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    await request(app)
      .post("/ride-requests")
      .send(rideRequest);

    // List ride requests
    const res = await request(app)
      .get("/ride-requests")
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual([rideRequest]);
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

    const submittedRideRequest = await request(app)
      .post("/ride-requests")
      .send(rideRequest);

    // Create a fleet
    const fleet = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const bid = new Bid(fleet, 60);

    // Place bid on ride request
    const res = await request(app)
      .post(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send(bid);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(bid);
  });

  it("should list bids for a ride request", async () => {
    // Submit a ride request
    const client = new Client("John Doe", "john.doe@email.com", "123");

    const rideRequest = new RideRequest(
      client,
      "123 Main St",
      "456 Elm St",
      50
    );

    const submittedRideRequest = await request(app)
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
    await request(app)
      .post(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send(bidA);

    await request(app)
      .post(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send(bidB);

    const res = await request(app)
      .get(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual([bidA, bidB]);
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

    const submittedRideRequest = await request(app)
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
    await request(app)
      .post(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send(bidA);

    await request(app)
      .post(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send(bidB);

    const listBidsRes = await request(app)
      .get(`/ride-requests/${submittedRideRequest.body.id}/bids`)
      .send();

    // Accept a bid
    const rideRequestId = submittedRideRequest.body.id;
    const bidBId = listBidsRes.body[1].id;

    const res = await request(app)
      .put(`/ride-requests/${rideRequestId}/bids/${bidBId}/accept`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(bidBId);
    expect(res.body.accepted).toEqual(true);
  });
});
