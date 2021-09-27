const movies = require('../routes/api/movies');
const axios = require('axios');
const { fetchMovies, getCommentCount, fetchMovieCharacters } = require('../services/swapi')
const {respondWithSuccess, respondWithWarning } = require('../helpers/responseHandler')

async function getMovies(req, res, next) {
    try {
       const result = await fetchMovies()
       const data = await Promise.all(result.data.results.map(async movie => {
           const { title, episode_id, opening_crawl, url } = movie;
           const commentCount = await getCommentCount(episode_id);
            return {
            id: Number(url.split('/')[5]),
            episode_id,
            title,  
            openingCrawl: opening_crawl,
            commentCount,
        }
    }))
       return res.status(200).send({
           success: true,
           message: 'movies fetched successfully',
           data
       })
    } catch (error) {
        return res.status(500).send({
            success: false,
           message: 'internal server error',
        })
        
    }
}

async function getMovieCharacters(req, res, next) {
    const { movieId } = req.params;
    try {
        const characters = await fetchMovieCharacters(movieId);
        const charactersTofetch = characters.map(url => axios.get(url));
        const movieCharacterDetails = await Promise.all(charactersTofetch);

        let data = movieCharacterDetails.map(person => person.data);

        if (req.query.sort === 'name') {
            data = movieCharacterDetails.map(person => person.data).sort((a, b) => a.name.localeCompare(b.name));
        }
        if (req.query.sort === 'gender') {
            data = movieCharacterDetails.map(person => person.data).sort((a, b) => a.gender.localeCompare(b.gender));
        }
        if (req.query.sort === 'height') {
            data = movieCharacterDetails.map(person => person.data).sort((a, b) => Number(a.height) - Number(b.height));
        }
        if (req.query.gender){
            data = data.filter(d => d.gender === req.query.gender)
        }

        const totalCount = data.length;
        const totalHeightInCm = data.map(i => i.height).reduce((a, b) => Number(a) + Number(b));
        const totalHeightInches = totalHeightInCm / 2.54
        const totalHeightInFeet = totalHeightInCm / 30.48

        return respondWithSuccess(res, 200, 'movie characters fetched successfully', { 
            metadata: {
            totalCount,
            totalHeightInches,
            totalHeightInFeet
        }
        , data });
    
    } catch (error) {
        return respondWithWarning(res, 500, 'internal server error');
        
    }
}



module.exports = {
    getMovies,
    getMovieCharacters
}