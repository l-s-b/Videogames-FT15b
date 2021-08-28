const { Router } = require("express");
const router = Router();
const axios = require("axios"); // Requiring Backend API request libraries
require("dotenv").config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require("../preloaded"); // Loading some extra mock videogames
const { Videogame } = require("../db.js"); // Importing DB table

module.exports = router.get("/videogame/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Is it within the preloaded games array? Let's find out:
    const found = preloaded.find(game => game.id === id);
    // console.log("Requested ID: " + id + ". Found ID: " + found.id);
    if (found) {
      console.log('Retrieved from "Preloaded" array.');
      return res.json(found);
    }

    // Is it in the DB? (WORKING! Just make sure you have the updated UUID.)
    /* const consoleTest = await Videogame.findAll();
    console.log(`ID: ${id}.`);
    console.log(consoleTest); */
    const db = await Videogame.findByPk(id);
    if (db) {
      console.log('Retrieved from Database.');
      return res.json(db);
    }
  } catch {
    try {
      //Or maybe is it in the API?
      const result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      if (result.data) {
        const apiId = result.data.id; // Tell ID parameter from result ID
        console.log(
                'Retrieved from API URL.' + '\n' +
                 "Requested ID:" + id + ". Found ID:" + apiId + ". RESULTS:" + result.data
                 );
        if (Number(apiId) === Number(id)) {
          return res.json(result.data);
        } else {
          return res.json("wrong ID!");
        }
      }
    } catch (e) {
        // console.log(res);
        e.request?.res?.statusCode === 404 ?
        res.json('Error 404! No game found with such ID.') : console.error(e);
        }
  }
});
