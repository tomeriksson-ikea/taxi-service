import request = require("supertest");
import { app } from "../server";
import { Client } from "./Client";

describe("Client", () => {
  it("should register and return the registered client", async () => {
    const client = new Client("John Doe", "john.doe@email.com", "1234567890");

    const res = await request(app)
      .post("/clients")
      .send(client);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(client);
  });
});
