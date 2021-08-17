const { Router } = require('express');
const axios = require('axios'); // Requiring Backend API request libraries
require('dotenv').config();
const { API_KEY } = process.env; // Importing API KEY
const { Videogame, Game_genre, vg_genre } = require('../db.js'); // Importing DB tables
const { Op } = require('sequelize'); // Bringing handy Sequelize operators
const router = Router();

