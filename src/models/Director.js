const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Director = sequelize.define("director", {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Director;
