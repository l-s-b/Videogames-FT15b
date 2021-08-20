const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require('../preloaded'); // Loading some extra mock videogames
const { Videogame } = require('../db.js'); // Importing DB table

module.exports = router.get('/videogame/:id', async (req, res) => {
        const id = req.params.id;
        try {
        // Is it within the preloaded games array? Let's find out:
        const found = preloaded.find(game => game.id === id);
        // console.log("Requested ID: " + id + ". Found ID: " + found.id);
        if(found) { console.log('Retrieved from "Preloaded" array'); return res.json(found); }

        // Is it in the DB? --- WHEN READY, CHECK THAT IT WORKS.
        const db = await Videogame.findByPk(id);
        if(db) { console.log('Retrieved from Database'); return res.json(db); }

        //Or maybe is it in the API?
        const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (result.data) {
                const resId = result.data.id; // Tell ID parameter from result ID
                console.log ("Requested ID: " + id + ". Found ID: " + resId + ". RESULTS: " + result.data);
        if(Number(resId) === Number(id)) { res.json(result.data) } else { res.json("wrong ID!") }
         }

        } catch(e) {console.log("Nice try.")};

});