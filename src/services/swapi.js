const axios = require('axios');
const Models = require('../database/models')

async function fetchMovies () {
    const url = 'https://swapi.dev/api/films'
    try {
        const response  = await axios(url);
        return response; 
        
    } catch (error) {
        
    }
}

async function fetchMovieCharacters (movieId) {
    const url = `https://swapi.dev/api/films/${movieId}`
    try {
        const response  = await axios(url);
        return response.data.characters; 
    } catch (error) {
        
    }
}


async function getCommentCount(movieId){
    const commentCount = await Models.Comments.count({
        where: {
            movieId
        }
    })
    return commentCount;
}



module.exports =  {
    fetchMovies,
    getCommentCount,
    fetchMovieCharacters
}