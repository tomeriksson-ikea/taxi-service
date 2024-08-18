import request = require("supertest");
import { app } from "../server";
import { RideRequest } from "./RideRequest";
import { Client } from "../Client/Client";

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
});
