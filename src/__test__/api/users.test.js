/**
 * @jest-environment node
 */

import app from "@/app/api/[...]/app";
import { makeHttpRequest } from "../makeHttpRequest";
import mongoose from "mongoose";
import { generateRandomUsers } from "../utils";
import User from "@/app/api/_lib/models/User";
import dbConnect from "@/lib/db/dbConnect";

const baseUrl = process.env.NEXT_PUBLIC_URL_APP
const usersTest = generateRandomUsers(5);

beforeAll(async () => {
  await dbConnect();
  await User.deleteMany({});
  for (const user of usersTest) {
    await User.create(user);
  }
});

test("renders a heading", async () => {
  const request = makeHttpRequest(baseUrl + "/api/admin/users", {
    method: "GET",
  });
  const response = await app.handler()(request);
  // check status code
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.users).toHaveLength(5);
  const contents = data.users.map(user => user.username)
  expect(contents).toContain(usersTest[0].username)
});
afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
