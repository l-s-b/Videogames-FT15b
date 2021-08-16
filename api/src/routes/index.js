const { Router } = require('express');
const axios = require('axios');
// Importing API KEY
require('dotenv').config();
const { API_KEY } = process.env;
// Importing DB tables:
// Don't forget to create and connect preloaded videogames.
const { Videogame, Genre, vg_genre } = require('../db.js');
// Bringing handy Sequelize operators:
const { Op } = require('sequelize');
// Require all individual routes;
// e.g: const getAllGames = require('./getAll.js');


const router = Router();

const preloaded = [{id: 1, name: "preloaded1"}, {id: 2, name: "preloaded2"}] // Working OK

const games = async () => {
    const fetch = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    console.log("API RESULTS: ", fetch.data.results);
    // LIMITING API to first 100 results:
    return fetch.data.results.slice(0, 99);
};

// Main route (Promise style)
router.get('/games', (req, res) => {
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then(response => {res.json([...response.data.results, ...preloaded])})
      .catch(error => res.status(500).json({error: 'Error 500: Cannot fetch API.'}));
});

/* Main route (Async style) (Incomplete)
router.get('/games', async (req, res) => {
    const name = req.query.name;
    const genre = req.query.genre;
    const created = req.query.created;

    const apiGames = await games();

    try {

    } catch(error) { console.log(error) }

})*/

// Route setup
// e.g: router.use('/getAll', getAllGames);


module.exports = router;
