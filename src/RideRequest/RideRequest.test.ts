import request = require("supertest");
import { app } from "../server";

describe("RideRequest", () => {
  it("should respond with 201 Created when created", async () => {
    const res = await request(app)
      .post("/ride-request")
      .send("");

    expect(res.status).toBe(201);
  });
});
