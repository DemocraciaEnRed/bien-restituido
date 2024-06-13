/**
 * @jest-environment node
 */

import app from "@/app/api/[...]/app";
import { makeHttpRequest } from "../makeHttpRequest";
import mongoose from "mongoose";


beforeAll((done) => {
  done();
});

test("renders a heading", async () => {
  const request = makeHttpRequest("http://localhost:3000/hello", {
    method: "GET",
  });
  const response = await app.handler()(request);
  // check status code
  expect(response.status).toBe(200);
  const data = await response.text();
  expect(data).toBe("world");
});
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
