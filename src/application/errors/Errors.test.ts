import { Express } from "express";
import { setupApp } from "../app";
import { agent } from "supertest";

describe("Errors", () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it("should respond with a bad request error if thrown", async () => {
    // client with missing name
    const client = {
      email: "john.doe@email.com",
      phone: "1234567890"
    };

    const res = await agent(app)
      .post("/clients")
      .send(client);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      message: "Client name must be of type string",
      error: "BadRequest"
    });
  });

  it("should respond with a not found error if thrown", async () => {
    const res = await agent(app)
      .get("/ride-requests/12345")
      .send();

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: "Ride request not found",
      error: "NotFound"
    });
  });
});
