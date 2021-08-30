const { Router } = require("express");
const router = Router();
const axios = require("axios"); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const { Videogame, Genre, vg_genres } = require("../db.js"); // Importing DB table

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
        let db = await Genre.findAll();
        if(!db.length) { // filling and reloading DB if necessary,
        await Genre.bulkCreate(genres);
        };

        // OK, NOW POST ITSELF:

        let [ dbGame, justAdded ]  = await Videogame.findOrCreate({
            where: {
                // No background image needed.
                // UUID is auto-generated.
                background_image: "https://freesvg.org/img/Game-Controller-Outline-White-2.png",
                name: submitted.name,
                description: submitted.description,
                released: submitted.released,
                rating: submitted.rating,
                genre_list: submitted.genre_list, // Integer list is OK.
                platforms: submitted.platforms, // Same here.
            }
        });
        console.log(justAdded ? "Game successfully added." : "Already found.");
        // E/R SETTING: Use 'setGenres' or 'addGenres' Sequelize methods
        await dbGame.setGenres(submitted.genre_list);
        // I reckon this is optional, but useful for Insomnia/Postman verification:
        //justAdded ? res.json(dbGame) : (res.status(304), res.json(dbGame));
        return res.json(dbGame);
    } catch(e) { console.error(e) }
})