const { Router } = require("express");
const router = Router();
const axios = require("axios"); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const { Videogame, GameGenre, vg_genres } = require("../db.js"); // Importing DB table

module.exports = router.post('/videogame', async (req, res) => {
    const submitted = req.body;
    try {
        // WORKING. DO NOT TOUCH DB FILLUP!
        // FIRST, FILL GENRE DB (Just like in './3.getGenres.js')
        const apiGenres = async () => {
            const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            return api.data.results;
        }
        const genres = await apiGenres();
        let db = await GameGenre.findAll();
        if(!db.length) { // filling and reloading DB if necessary,
        await GameGenre.bulkCreate(genres);
        };

        // OK, NOW POST ITSELF:

        let [ dbGame, justAdded ]  = await Videogame.findOrCreate({
            where: {
                // No background image needed.
                // UUID is auto-generated.
                name: submitted.name,
                description: submitted.description,
                released: submitted.released,
                rating: submitted.rating,
                genres: submitted.genres, // Change later to JSON.
                platforms: submitted.platforms, // Same here.
            }
        });
        console.log(justAdded ? "Game successfully added." : "Already found.");
        // E/R SETTING: Use 'setGameGenres' or 'addGameGenres' Sequelize methods
        await dbGame.setGameGenres(submitted.genres);
        // I reckon this is optional, but useful for Insomnia/Postman verification:
        justAdded ? res.json(dbGame) : (res.status(304), res.json(dbGame));
    } catch(e) { console.error(e) }
})