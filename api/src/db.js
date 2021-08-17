require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Reading, importing and pushing all models into modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Sequelize injection
modelDefiners.forEach(model => model(sequelize));
// Model name capitalization ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Get models from destructuring sequelize.models
const { Videogame, Game_genre } = sequelize.models;

// Entity relations
Videogame.belongsToMany(Game_genre, { through: "vg_genre" });
Game_genre.belongsToMany(Videogame, { through: "vg_genre" });

module.exports = {
  ...sequelize.models, // To be imported as models in routes:
//                        const { Videogame, Game_genre } = require('./db.js');
  conn: sequelize,     // To be imported as connection @ 'api/index.js'.
};
