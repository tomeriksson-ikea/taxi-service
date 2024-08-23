import { agent } from "supertest";
import { setupApp } from "../App";
import { Client } from "./Client";
import { Express } from "express";

describe("Client", () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it("should register and return the registered client", async () => {
    const client = new Client("John Doe", "john.doe@email.com", "1234567890");

    const res = await agent(app)
      .post("/clients")
      .send(client);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(client);
  });
});
