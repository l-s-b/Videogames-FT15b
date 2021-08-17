const { Router } = require('express');
const router = Router();

// Require all individual routes;
const main = require('./1.main.js');
const detail = require('./2.getDetail.js');
// const genres = require('./3.getGenres.js');
// const post = require('./4.postGame.js');

// Route setup
router.use('/', main);
router.use('/', detail);
// router.use('/', genres);
// router.use('/', post);

module.exports = router;