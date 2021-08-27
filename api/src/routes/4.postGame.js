const { Router } = require("express");
const router = Router();
const axios = require("axios"); // Requiring Backend API request libraries
const { Videogame, Game_genre, vg_genres } = require("../db.js"); // Importing DB table

module.exports = router.post('/videogame', async (req, res) => {
    const submitted = req.body;
    try {
        let [ dbGame, justAdded ]  = await Videogame.findOrCreate({
            where: {
                // No background image needed.
                // UUID is auto-generated.
                name: submitted.name,
                description: submitted.description,
                released: submitted.released,
                rating: submitted.rating,
                genres: submitted.genres, // Must be an array of genre IDs (or objects?).
                platforms: submitted.platforms, // Same here.
            }
        });
        console.log(justAdded ? "Game successfully added." : "Already found.");
        // E/R SETTING: Use 'setGame_genres' or 'addGame_genres' Sequelize methods
        await dbGame.setGame_genres(submitted.genres);
        // I reckon this is optional, but useful for Insomnia/Postman verification:
        return res.json(dbGame);
    } catch(e) { console.error(e) }
})