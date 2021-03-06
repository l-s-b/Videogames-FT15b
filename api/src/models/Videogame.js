const { DataTypes, Sequelize, VIRTUAL } = require('sequelize');
// DB Model export and injection to Sequelize
module.exports = (sequelize) => {
  // Model Definition
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    background_image: { type: DataTypes.STRING },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    description: { type: DataTypes.STRING, },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    genre_list: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      // NOT DataTypes.JSONs because '../routes/4.postGame.js'
      defaultValue: [],
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      // Change into DataTypes.JSON if necessary.
      defaultValue: [],
      allowNull: false,
    },
    stores: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    route: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        return `/main/videogame/${this.getDataValue('id')}`
      }
    },
  });
};
