const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Casillero = sequelize.define(
  "casilleros",
  {
    idCasillero: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      unique: true,
    },
    Pais: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Ciudad: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    codigoPostal: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

  },
  {
    tableName: "casilleros",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Casillero.sync({ force: false })
  .then(() => {
    console.log("Tabla de Casillero sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Casillero:", error);
  });

module.exports = Casillero;