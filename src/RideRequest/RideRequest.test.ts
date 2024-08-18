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
      .post("/ride-request")
      .send(rideRequest);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(rideRequest);
  });
});
