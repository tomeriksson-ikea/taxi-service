import { agent } from "supertest";
import { setupApp } from "../App";
import { Fleet } from "./Fleet";
import { Express } from "express";

describe("Fleet", () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it("should register and return the registered fleet", async () => {
    const fleet = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const res = await agent(app)
      .post("/fleets")
      .send(fleet);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(fleet);
  });
});
