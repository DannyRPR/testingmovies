const Movie = require('./Movie');
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');

Actor.belongsToMany(Genre, {through:"ActorsGenres"});
Genre.belongsToMany(Actor, {through:"ActorsGenres"});

Director.belongsTo(Actor);
Actor.hasMany(Director);

Movie.belongsToMany(Actor, { through: "MoviesActors"});
Actor.belongsToMany(Movie, { through: "MoviesActors"});

Movie.belongsToMany(Genre, {through: "MoviesGenres"});
Genre.belongsToMany(Movie, {through: "MoviesGenres"});

Director.belongsToMany(Movie, {through: "MoviesDirectors"});
Movie.belongsToMany(Director, {through: "MoviesDirectors"});