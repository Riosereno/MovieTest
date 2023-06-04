const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Movie = sequelize.define("movie", {
  name: {
    type: DataTypes.STRING,
    
  },
  image: {
    type: DataTypes.STRING,
    
  },
  synopsis: {
    type: DataTypes.STRING,
   
  },
  releaseYear: {
    type: DataTypes.STRING,
  
  },
});

module.exports = Movie;
