const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Genre = require("../models/Genre");
const Director = require("../models/Director");

require("../models");

let movieId;

test("POST /movies", async () => {
  const movie = {
    name: "Armagedon",
  };
  const res = await request(app).post("/movies").send(movie);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
test("GET /movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id", async () => {
  const Updatedmovie = {
    name: "Armagedon updated",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(Updatedmovie);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(Updatedmovie.name);
});

test("POST /movies/:id/actors should set the movie actors", async () => {
  const actor = await Actor.create({ name: "Bruce willis" });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movie directors", async () => {
  const director = await Director.create({ name: "James Cameron" });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);

  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movie genres", async () => {
  const genre = await Genre.create({ name: "Romantica" });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
