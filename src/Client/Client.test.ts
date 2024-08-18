import request = require("supertest");
import { app } from "../server";

describe("Client", () => {
  it("should respond with 201 Created and with created client", async () => {
    const res = await request(app)
      .post("/client")
      .send("");

    expect(res.status).toBe(201);
  });
});
