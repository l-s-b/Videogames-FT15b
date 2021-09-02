// WORKING!
const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require('../preloaded'); // Loading some extra mock videogames
const { Videogame, Genre } = require("../db.js"); // Importing DB table

// M A I N   R O U T E (async style) (100 items)
// With while loop:
const main = router.get('/videogames', async (req, res) => {
    let { name, genre, created } = req.query;
        try { // FIRST, GET ALL 100 ITEMS.
            let finalList = [];
        let previous = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        finalList = [...previous.data.results];
        while (finalList.length < 100) {
            let next = await axios.get(previous.data.next);
            finalList = [...finalList, ...next.data.results,]
            previous = next;
        }
        // Now adding videogames from DB:
        const db = await Videogame.findAll({ include: Genre }); // Genre connection
        // console.log(db);
        // EXTRA: Adding a small set of preloaded games
        finalList = [...db, ...finalList, ...preloaded];
        // console.log('List count: ', finalList.length);

    // NAME QUERY (WORKING!)
        if(name) {
            name = name.toLowerCase();
            try {
                const nameFilter = finalList.filter(
                    game => game.name?.toLowerCase().includes(name) ||
                    game.slug?.includes(name));
                nameFilter.length ?
                res.json(nameFilter) :
                res.json("Sorry, no games by that name.");
                return;
            } catch(e) {return console.error(e);}
    }
// GENRE QUERY (Solve later, working poorly)
    if(genre) {
        console.log(typeof genre.toLowerCase());
        try {
            const genreList = "caca";
            genreFilter && genreFilter.length ?
            res.json(genreFilter) :
            res.json('Nothing found.');
            return;
        } catch(e) {return console.error(e);}
    }

// ORIGIN QUERY (WORKING!)
if (created) { switch (created) {
    case "t": return res.json(finalList.filter(game => game.created));
    case "f": return res.json(finalList.filter(game => !game.created));
    default: break;
} return res.json('Invalid created status.');
}

// NO QUERIES:
        return res.json(finalList);
        } catch(e) { // Error yet to work out. Still works, though.
            if (e.code === 'ECONNRESET') {
             console.log("Connection error. Retrying...");
             return main;
             } else console.error(e);
        };
});

module.exports = main;
// Without while loop:
/*
router.get('/games', async (req, res) => {
    try {
        const page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const page2 = await axios.get(page1.data.next);
        const page3 = await axios.get(page2.data.next);
        const page4 = await axios.get(page3.data.next);
        const page5 = await axios.get(page4.data.next);

        finalList = [
            ...db,
            ...preloaded,
            ...page1.data.results,
            ...page2.data.results,
            ...page3.data.results,
            ...page4.data.results,
            ...page5.data.results,

        ];
        res.json([finalList]);
        console.log('List count: ', finalList.length);
        } catch(error) {console.log(error)};

});*/

// (Promise style) (20 items, working)
/*
router.get('/games', (req, res) => {
    const totalGames = [];
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            .then(response => {
                totalGames.push(response.data.results);
                res.json([...totalGames, ...preloaded])
            }).catch(error => res.status(500).json({error: 'Error merging API and DB games.'}));

});
*/
