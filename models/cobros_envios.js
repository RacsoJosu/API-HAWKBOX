const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const CobroEnvio = sequelize.define(
  "cobros_envios",
  {
    idCobro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    volumen: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "cobros_envios",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

CobroEnvio.sync({ force: false })
  .then(() => {
    console.log("Tabla de CobroEnvio sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de CobroEnvio:", error);
  });

module.exports = CobroEnvio;
