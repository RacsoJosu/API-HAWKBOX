const { prisma } = require('../config/database');

const findAllEmpresa = async (id) => await prisma.empresas_de_envios.findMany();

module.exports = {
    findAllEmpresa
};
