const { Router } = require('express');
const axios = require('axios');
// Importing DB tables:
const { Videogame, Genre, vg_genre } = require('./db.js');
// Bringing handy Sequelize operators:
const { Op } = require('sequelize');
// Require all individual routes;
// e.g: const getAllGames = require('./getAll.js');


const router = Router();

const data = async () => {
    const fetch = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    console.log("API RESULTS: ", fetch.data.results);
    // LIMITING API to first 100 results:
    return fetch.data.results.slice(0, 99);
};

router.get('/games', async (req, res) => {
    const name = req.query.name;
    const genre = req.query.genre;
    const created = req.query.created;

    const api = await data();

    try {

    } catch(error) { }

})

// Route setup
// e.g: router.use('/getAll', getAllGames);


module.exports = router;
