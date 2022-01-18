const { Router } = require('express');
const { getComments, postComment } = require('../../controllers/comments');
const { getMovies, getMovieCharacters } = require('../../controllers/movies');

const movie = Router();

movie.get('/', getMovies);
movie.get('/characters/:movieId', getMovieCharacters);
movie.get('/comments/:movieId', getComments);
movie.post('/comment/:movieId', postComment);


module.exports = movie;