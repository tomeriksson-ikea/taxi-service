import request = require("supertest");
import { app } from "../server";
import { Fleet } from "./Fleet";

describe("Fleet", () => {
  it("should register and return the registered fleet", async () => {
    const fleet = new Fleet(
      "Johns Taxi fleet",
      "john.doe@email.com",
      "1234567890"
    );

    const res = await request(app)
      .post("/fleets")
      .send(fleet);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(fleet);
  });
});
