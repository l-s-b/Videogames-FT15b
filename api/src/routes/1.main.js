// WORKING!
const { Router } = require('express');
const router = Router();
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const preloaded = require('../preloaded'); // Loading some extra mock videogames

// M A I N   R O U T E (async style) (100 items)
// With while loop:
module.exports = router.get('/games', async (req, res) => {
    try {
        let finalList = [];
        let previous = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        finalList = [...previous.data.results];
        while (finalList.length < 100) {
            let next = await axios.get(previous.data.next);
            finalList = [...finalList, ...next.data.results,]
            previous = next;
        }
        res.json([ ...preloaded, ...finalList]);
        console.log('List count: ', finalList.length);
        } catch(error) {console.log(error)};

});
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

/* Main route queries (Async style) (Incomplete)

    const name = req.query.name;
    const genre = req.query.genre;
    const created = req.query.created;
    const apiGames = await games();

    try {

    } catch(error) { console.log(error) }

})*/

// Main route (Promise style) (20 items, working)
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
