const request = require("supertest");
const app = require("../app");

let newid;
test("POST /directors", async () => {
  const actor = {
    firstName: "dan",
    lastName: "portillaa",

    nationality: "COLOMBIANA",

    image:
      "data:image/jpeg;base64,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",
    birthday: "07/02/23"
  };
  const res = await request(app).post("/directors").send(actor);
  newid = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

  test("PUT /directors/:id", async () => {
    const directorUpdate = {
      birthday: "07/02/23",
    };
    const res = await request(app)
      .put(`/directors/${newid}`)
      .send(directorUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(directorUpdate.name);
  });

test("DELETE /directors/:id", async () => {
  const res = await request(app).delete(`/directors/${newid}`);
  expect(res.status).toBe(204);
});
