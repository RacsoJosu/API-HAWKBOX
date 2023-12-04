const { prisma } = require('../config/database');
const { findAllPackages } = require('../repository/paquetes');
const { handleHttpError } = require('../utils/handleError');


const getPackages = async (req, res) => {
    try {
        const id  = req.headers.idUser
        const packages = await findAllPackages(id)
        res.json({ packages })
    } catch (error) {
        console.log({ error })
        handleHttpError(res, "BAD_REQUEST", 500)
    }
}

const createPackage = async (req, res) => {
    try {
        const { body } = req
        const fechaEnvio = new Date()
        const package = await prisma.paquetes.create({
            data: {
                peso: body.weight,
                estado: body.state,
                descripcion: body.description,
                fechaEnvio,
                usuario: {
                    connect: {
                        idUsuario: req.headers.idUser
                    }
                }
            }
        })

        res.json({ newPackage: package.idPaquete })

    } catch (error) {
        console.log({ error })
        handleHttpError(res, "BAD_REQUEST", 500)
    }
}


module.exports = {
    getPackages,
    createPackage,
};
