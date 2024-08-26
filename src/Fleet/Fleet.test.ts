import { agent } from "supertest";
import { setupApp } from "../App";
import { Express } from "express";

describe("Fleet", () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it("should register and return the registered fleet", async () => {
    const fleet = {
      name: "John Does Fleet",
      email: "john.doe@fleet.com",
      phone: "1234567890"
    };

    const res = await agent(app)
      .post("/fleets")
      .send(fleet);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: expect.any(String), data: fleet });
  });
});
