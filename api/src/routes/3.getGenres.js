const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const { GameGenre } = require('../db.js'); // Importing DB tables

const apiGenres = async () => {
    const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    return api.data.results;
}

module.exports = router.get('/genres', async (req, res) => {
    const genres = await apiGenres();
    try { //Checking db content,
    let db = await GameGenre.findAll();
    if(!db.length) { // filling and reloading DB if necessary,
        await GameGenre.bulkCreate(genres);
        db = await GameGenre.findAll();
    } // showing output.
    return res.json(db);
    } catch(e) {console.log(e)};

});