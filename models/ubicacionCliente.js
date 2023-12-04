const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const UbicacionCliente = sequelize.define(
  "ubicacion_clientes",
  {
    idUbicacionCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Departamento: {
      type: DataTypes.STRING,
    },
    Ciudad: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    Direccion: {
      type: DataTypes.STRING,
    },
    
  },
  {
    tableName: "ubicacion_clientes",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

UbicacionCliente.sync({ force: false })
  .then(() => {
    console.log("Tabla de UbicacionCliente sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de UbicacionCliente:", error);
  });

module.exports = UbicacionCliente;