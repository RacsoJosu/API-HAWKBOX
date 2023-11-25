const {Sequelize} = require("sequelize");

const database= process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(( {
    dialect: 'mysql',
    host,
    database,
    username,
    password,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Ajusta esto según tus necesidades de seguridad
      },
    },
  }))

const dbConnect = async()=>{
    try{
        await sequelize.authenticate()
        console.log("MYSQL conexion Correcta")
    }catch (e){
        console.log("MSQL Error de Conexion",e);
    }

};

module.exports = {sequelize, dbConnect}
