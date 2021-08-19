const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require('../preloaded'); // Loading some extra mock videogames

module.exports = router.get('/videogame/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Is it within the preloaded games array? Let's find out:
        const found = preloaded.find(game => game.id === id);
        // console.log("Requested ID: " + id + ". Found ID: " + found.id);
        if (found) res.json(found);

        //Or maybe is it in the API?  -----  DON'T FORGET THE DB.
        const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (result.data) {
                const resId = result.data.id; // Tell ID parameter from result ID
                console.log ("Requested ID: " + id + ". Found ID: " + resId + ". RESULTS: " + result.data);
        if(Number(resId) === Number(id)) { res.json(result.data) } else { res.json("wrong ID!") }
         }

        } catch(e) {console.log("Nice try.")};

});