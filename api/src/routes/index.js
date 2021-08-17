const { Router } = require('express');
const router = Router();

// Require all individual routes;
const main = require('./main.js');
// const detail = require('./getDetail.js');
// const post = require('./postGame.js');
// const genres = require('./getGenres.js');

// Route setup
router.use('/', main);
// router.use('/', detail);
// router.use('/', post);
// router.use('/', genres);

module.exports = router;
