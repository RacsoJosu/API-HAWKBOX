const { prisma } = require("../config/database");

const getUserDeviceidById = async (id) => await prisma.usuarios.findUnique({
    where:{idUsuario:id}, select:{
        deviceid: true,
        idUsuario: true,
        contrasenia: true,
        correo: true
    }
}) 

module.exports = {
    getUserDeviceidById
};
