const request = require('supertest');
const app = require('../app');

let newid;
test('POST /genres', async () =>{
    const genre = {
        name: "Pop"
    }
    const res = await request(app).post('/genres').send(genre)
    newid= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /genres', async () => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
  //  expect(res.body).toHavelength(1);
 });

 test('PUT /genres/:id', async() =>{
    const genreUpdate= {
        name: "Pop ular"
    }
    const res = await request(app)
    .put(`/genres/${newid}`)
    .send(genreUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdate.name);

 });

 test('DELETE /genres/:id', async () => {
    const res = await request(app).delete(`/genres/${newid}`);
    expect(res.status).toBe(204);
 });