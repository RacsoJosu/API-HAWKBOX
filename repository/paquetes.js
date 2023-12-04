const { prisma } = require('../config/database');

const findAllPackages = async (id) => await prisma.paquetes.findMany({ where: { idUsuario: id } })

module.exports = {
    findAllPackages
};
