const { prisma } = require('../config/database');

const findAllPackages = async (id) => await prisma.paquetes.findMany({ where: { idUsuario: id },select:{ trakingNumber:true,descripcion:true,peso:true,estado:true,imageUrl:true,transitos:true}})

module.exports = {
    findAllPackages
};
