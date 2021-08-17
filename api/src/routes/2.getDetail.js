const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require('../preloaded'); // Loading some extra mock videogames

module.exports = router.get('/videogame/:id', async (req, res) => {
    try {
        const id = req.query.id; // UNDEFINED! VER QUÉ PASA.
        const request = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        // DON'T FORGET TO INCLUDE THE PRELOADED AND DB GAMES!
        const results = request.data;
        console.log ("ID: " + id + ". RESULTS: " + results);
        res.json([{
                background_image: results.background_image,
                name: results.name,
                genres: results.genres,
                description: results.description,
                released: results.released,
                rating: results.rating,
                platforms: results.platforms,
        }]);
        } catch(error) {console.log(error)};

});