const { Router } = require("express");
const router = Router();
const axios = require("axios"); // Requiring Backend API request libraries
require("dotenv").config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require("../preloaded"); // Loading some extra mock videogames
const { Videogame, Genre } = require("../db.js"); // Importing DB table

module.exports = router.get("/videogame/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Is it within the preloaded games array? Let's find out:
    const found = preloaded.find(game => game.id === id);
    if (found) {
      return res.json(found);
    }

    // Is it in the DB? (WORKING! Just make sure you have the updated UUID.)
    // Don't forget the Genre connection!
    const db = await Videogame.findByPk(id, { include: Genre });
    if (db) {
      return res.json(db);
    }
  } catch {
    try {
      //Or is it maybe in the API?
      const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      if (result.data) {
        const apiId = result.data.id; // Tell ID parameter from result ID
        if (Number(apiId) === Number(id)) {
          return res.json(result.data);
        } else {
          return res.json("wrong ID!");
        }
      }
    } catch (e) {
        e.request?.res?.statusCode === 404 ?
        res.json('Error 404! No game found with such ID.') : console.error(e);
        }
  }
});
