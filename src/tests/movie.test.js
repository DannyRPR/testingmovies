const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let newid;
test('POST /movies', async () =>{
    const movie = {
        name: "jumangi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIc2OGKeiHYdhLPzwTmNWibpsrj8DTu7B1pQ&usqp=CAU",
        synopsis: "nasdnfak",
          releaseYear: 1992
    }
    const res = await request(app).post('/movies').send(movie)
    newid= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id', async() =>{
    const movieUpdate= {
        name: "Pop ular"
    }
    const res = await request(app)
    .put(`/movies/${newid}`)
    .send(movieUpdate);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdate.name);

 });

test('POST /movies/:id/actors', async () =>{
    const movie = await Actor.create({ firstName: "dan",
    lastName: "portillaa",
    nationality: "COLOMBIANA",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDoj97-5su6HrT1xzKjYae7pWq4_-zpqelg&usqp=CAU",
  birthday: "07/02/23"});
    const res = (await request(app).post(`/movies/${newid}/actors`))
    .send([movie.id]);
    movie.destroy();
    expect(res.status).toBe(200);
});


test('POST /movies/:id/genres', async () =>{
    const genre = await Genre.create({name: "rock"});
    const res = (await request(app).post(`/movies/${newid}/genres`))
    .send([genre.id]);
    genre.destroy();
    expect(res.status).toBe(200);
});


test('POST /movies/:id/directors', async () =>{
    const movie = await Director.create({firstName: "daaan",
    lastName: "portiaa",
    nationality: "COLOMBANA",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDoj97-5su6HrT1xzKjYae7pWq4_-zpqelg&usqp=CAU",
  birthday: "07/03/23"});
    const res = (await request(app).post(`/movies/${newid}/directors`))
    .send([movie.id]);
    movie.destroy();
    expect(res.status).toBe(200);
});



 test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${newid}`);
    expect(res.status).toBe(204);
 });