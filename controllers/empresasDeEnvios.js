const { prisma } = require("../config/database");
const { findAllPackages } = require("../repository/paquetes");
const { handleHttpError } = require("../utils/handleError");

/**
 *
 * @param {*} req
 * @param {*} res
 */

const createEmpresasDeEnvios = async (req, res) => {
  try {
    const { body } = req;
    const empresasDeEnvios = await prisma.empresas_de_envios.create({
      data: {
        idEmpresa: body.idEmpresa,
        nombre: body.name,
      },
    });

    res.json({ newEmpresadeEnvios: empresasDeEnvios.idEmpresa });
  } catch (error) {
    console.log({ error });
    handleHttpError(res, "BAD_REQUEST", 500);
  }
};


module.exports = {
  createEmpresasDeEnvios
};