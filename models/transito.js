const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Transito = sequelize.define(
  "transito",
  {
    idTransito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fechaRecibido: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fechaEntregado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Observaciones: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },   
    
  },
  {
    tableName: "transitos",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Transito.sync({ force: false })
  .then(() => {
    console.log("Tabla de Transito sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Transito:", error);
  });

module.exports = Transito;
