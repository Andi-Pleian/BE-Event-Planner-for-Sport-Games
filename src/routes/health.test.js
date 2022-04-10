import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("routes", () => {
  it("should return a 200 status code on health endpoint", async () => {
    const response = await request.get("/health/");
    expect(response.status).toBe(200);
  });
});
