const { prisma } = require('../config/database');
const { findAllPackages } = require('../repository/paquetes');
const { handleHttpError } = require('../utils/handleError');
const { generateTrackinNumber } = require('../utils/handleTrackingNumber');


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
        const { body, file } = req
        const imageUrl = `http://localhost:3000/images/${file.filename}`
        const fechaEnvio = new Date()
        const trackinNumber = generateTrackinNumber()

        
        const package = await prisma.paquetes.create({
            data: {
                peso: body.weight,
                estado: body.state,
                descripcion: body.description,
                fechaEnvio,
                trackinNumber,
                imageUrl,
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
