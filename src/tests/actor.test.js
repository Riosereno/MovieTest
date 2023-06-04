const request = require("supertest");
const app = require("../app");
const Movie = require("../models/Movie");

require("../models");

let actorId;
test("POST /actors", async () => {
  const actor = {
    firstName: "Steven",
    lastName: "spielberg",
    nationality: "EUA",
    image: "www.gato.com",
    birthday: "1970/10/10",
  };
  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
test("GET /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id", async () => {
    const UpdatedActor = {
      firstName: "Bruno",
      lastName: "Mars updated"
    };
    const res = await request(app)
      .put(`/actors/${actorId}`)
      .send(UpdatedActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(UpdatedActor.firstName);
    expect(res.body.lastName).toBe(UpdatedActor.lastName);
  });

test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
