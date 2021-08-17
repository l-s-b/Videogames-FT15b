const { Router } = require('express');
const axios = require('axios');
// Importing API KEY
require('dotenv').config();
const { API_KEY } = process.env;
// Importing DB tables:
// Don't forget to create and connect preloaded videogames.
const { Videogame, Game_genre, vg_genre } = require('../db.js');
// Bringing handy Sequelize operators:
const { Op } = require('sequelize');
// Require all individual routes;
// e.g: const getAllGames = require('./getAll.js');


const router = Router();

const preloaded = [
    {
    "id": 60,
    "name": "Tocada Online",
    "background_image": 'https://images.pexels.com/photos/3038122/pexels-photo-3038122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    "description": 'The all-time playground classic, finally on mainstream consoles.',
    "released": '2021-08-17',
    "rating": 4.6,
    "platforms": [{
        "platform": {
          "id": 187,
          "name": "PlayStation 5",
          "slug": "playstation5",
          "image": null,
          "year_end": null,
          "year_start": 2020,
          "games_count": 311,
          "image_background": "https://media.rawg.io/media/games/faa/faa6a4a7a2e57faf2960329630aee211.jpg"
        },
        "released_at": "2013-09-17",
        "requirements_en": null,
        "requirements_ru": null
      },
      {
        "platform": {
          "id": 18,
          "name": "PlayStation 4",
          "slug": "playstation4",
          "image": null,
          "year_end": null,
          "year_start": null,
          "games_count": 6028,
          "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
        },
        "released_at": "2013-09-17",
        "requirements_en": null,
        "requirements_ru": null
      },
      {
        "platform": {
          "id": 16,
          "name": "PlayStation 3",
          "slug": "playstation3",
          "image": null,
          "year_end": null,
          "year_start": null,
          "games_count": 3627,
          "image_background": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg"
        },
        "released_at": "2013-09-17",
        "requirements_en": null,
        "requirements_ru": null
      },
      {
        "platform": {
          "id": 14,
          "name": "Xbox 360",
          "slug": "xbox360",
          "image": null,
          "year_end": null,
          "year_start": null,
          "games_count": 2722,
          "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
        },
        "released_at": "2013-09-17",
        "requirements_en": null,
        "requirements_ru": null
      }],
        "created": true,
    },
    {
        "id": 67,
        "name": "Teto 2: Real Low",
        "background_image": 'https://www.catastrofico.com.ar/web/wp-content/uploads/2012/09/tetopost.jpg',
        "description": "Get away from Teto Medina's hands before he gets you to crouch and stick it in you.",
        "released": '2021-08-16',
        "rating": 3.9,
        "platforms": [{
            "platform": {
              "id": 187,
              "name": "PlayStation 5",
              "slug": "playstation5",
              "image": null,
              "year_end": null,
              "year_start": 2020,
              "games_count": 311,
              "image_background": "https://media.rawg.io/media/games/faa/faa6a4a7a2e57faf2960329630aee211.jpg"
            },
            "released_at": "2013-09-17",
            "requirements_en": null,
            "requirements_ru": null
          },
          {
            "platform": {
              "id": 18,
              "name": "PlayStation 4",
              "slug": "playstation4",
              "image": null,
              "year_end": null,
              "year_start": null,
              "games_count": 6028,
              "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
            },
            "released_at": "2013-09-17",
            "requirements_en": null,
            "requirements_ru": null
          },
          {
            "platform": {
              "id": 16,
              "name": "PlayStation 3",
              "slug": "playstation3",
              "image": null,
              "year_end": null,
              "year_start": null,
              "games_count": 3627,
              "image_background": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg"
            },
            "released_at": "2013-09-17",
            "requirements_en": null,
            "requirements_ru": null
          },
          {
            "platform": {
              "id": 14,
              "name": "Xbox 360",
              "slug": "xbox360",
              "image": null,
              "year_end": null,
              "year_start": null,
              "games_count": 2722,
              "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
            },
            "released_at": "2013-09-17",
            "requirements_en": null,
            "requirements_ru": null
          }],
            "created": true,
        },
    ] // Working OK


// Main route (Promise style)
/* (Basic, working)
router.get('/games', (req, res) => {
    const totalGames = [];
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            .then(response => {
                totalGames.push(response.data.results);
                res.json([...totalGames, ...preloaded])
            }).catch(error => res.status(500).json({error: 'Error merging API and DB games.'}));

});
*/

// M A I N   R O U T E (async style) (100 items)

// Without loop:
/*router.get('/games', async (req, res) => {
    try {
        const page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const page2 = await axios.get(page1.data.next);
        const page3 = await axios.get(page2.data.next);
        const page4 = await axios.get(page3.data.next);
        const page5 = await axios.get(page4.data.next);

        finalList = [
            ...page1.data.results,
            ...page2.data.results,
            ...page3.data.results,
            ...page4.data.results,
            ...page5.data.results,
            ...preloaded
        ];
        res.json([finalList]);
        console.log('List count: ', finalList.length);
        } catch(error) {console.log(error)};

});*/

// With loop:
router.get('/games', async (req, res) => {
    try {
        let finalList = [];
        let previous = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        finalList = [...previous.data.results];
        while (finalList.length < 100) {
            let next = await axios.get(previous.data.next);
            finalList = [...finalList, ...next.data.results,]
            previous = next;
        }
        res.json([...finalList, ...preloaded]);
        console.log('List count: ', finalList.length);
        } catch(error) {console.log(error)};

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
