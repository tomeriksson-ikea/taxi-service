import request = require("supertest");
import { app } from "../server";

describe("RideRequest", () => {
  it("should submit a new RideRequest", async () => {
    const res = await request(app)
      .post("/ride-request")
      .send("");

    expect(res.status).toBe(201);
  });
});
