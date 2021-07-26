const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumericStr: (value) => {
          if(!isNaN(parseInt(value.split("-")[0]))) return true
          else return false
        }
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumericStr: (value) => {
          if(!isNaN(parseInt(value.split("-")[0]))) return true
          else return false
        }
      }
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        isNumericStr: (value) => {
          if(!isNaN(parseInt(value.split("-")[0]))) return true
          else return false
        }
      }
    },
    image: {
      type: DataTypes.STRING,
    }

  });
  
};
