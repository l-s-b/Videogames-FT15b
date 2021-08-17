const { DataTypes, Sequelize } = require('sequelize');
// DB Model export and injection to Sequelize
module.exports = (sequelize) => {
  // Model Definition
  sequelize.define('game_genre', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM,
      values: [
        'Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter',
        'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer',
        'Racing', 'Massively Multiplayer', 'Sports', 'Fighting',
        'Family', 'Board Games', 'Educational', 'Card'
      ],
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
