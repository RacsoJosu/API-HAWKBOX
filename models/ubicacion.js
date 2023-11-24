const {sequelize} = require("../config/database");
const { DataTypes } = require('sequelize');


const Ubicacion = sequelize.define('ubicaciones', {
    idUbicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    latitud: {
      type: DataTypes.FLOAT,
    },
    longitud: {
      type: DataTypes.FLOAT,
    },
    fechaHora: {
      type: DataTypes.DATE,
    },
    idPaquete:{
      type:DataTypes.INTEGER
    },
    createdAt:{
        type:DataTypes.DATE
    },
    updatedAt:{
        type:DataTypes.DATE
    },
  },{
    tableName:'ubicaciones',
    timestamps: true,  
} 
  );

  Ubicacion.sync({ force: false})
  .then(() => {
    console.log("Tabla de Ubicaciones sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar tabla de Ubicaciones:", error);
});
module.exports = Ubicacion;

