const { Router } = require('express');
const movie = require('./api/movies')

const apiRouter = Router();

apiRouter.use('/api/v1/movie', movie);

module.exports = apiRouter