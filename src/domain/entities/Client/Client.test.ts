import { agent } from "supertest";
import { setupApp } from "../../../application/app";
import { Express } from "express";

describe("Client", () => {
  let app: Express;

  beforeEach(async () => {
    app = await setupApp();
  });

  it("should register and return the registered client", async () => {
    const client = {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "1234567890"
    };

    const res = await agent(app)
      .post("/clients")
      .send(client);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: expect.any(String), data: client });
  });

  describe("Client validation", () => {
    it("should throw error if client name is missing", async () => {
      const client = {
        name: undefined,
        email: "john.doe@email.com",
        phone: "1234567890"
      };

      const res = await agent(app)
        .post("/clients")
        .send(client);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "ClientValidationError",
        message:
          "Client validation failed; Required fields validation failed; Missing fields: name"
      });
    });

    it("should throw error if client email is not matching email pattern", async () => {
      const client = {
        name: "John Doe",
        email: "john.doe_email.com",
        phone: "1234567890"
      };

      const res = await agent(app)
        .post("/clients")
        .send(client);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "ClientValidationError",
        message:
          "Client validation failed; Email validation failed; String validation failed; String is not an email"
      });
    });

    it("should throw error if client phone number is not of type string", async () => {
      const client = {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: 1234567890
      };

      const res = await agent(app)
        .post("/clients")
        .send(client);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "ClientValidationError",
        message:
          "Client validation failed; Phone validation failed; String validation failed; Value is not a string"
      });
    });
  });
});
