const request = require("supertest");
const app = require("../app");
const Movie = require("../models/Movie");
require("../models");

let directorId;
test("POST /directors", async () => {
  const director = {
    firstName: "Steven",
    lastName: "spielberg",
    nationality: "EUA",
    image: "www.gato.com",
    birthday: "1970/10/10",
  };
  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
test("GET /directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id", async () => {
    const UpdatedDirector = {
      firstName: "Bruno",
      lastName: "Mars updated"
    };
    const res = await request(app)
      .put(`/directors/${directorId}`)
      .send(UpdatedDirector);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(UpdatedDirector.firstName);
    expect(res.body.lastName).toBe(UpdatedDirector.lastName);
  });

test("DELETE /directors/:id", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
