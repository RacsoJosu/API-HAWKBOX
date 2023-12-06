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
        const { body} = req
        const imageUrl = `http://localhost:5000/images/-`
        

        const trakingNumber = `${Date.now()}`;
        const peso = parseFloat(body.weigth)

        
        const package = await prisma.paquetes.create({
            data: {
                peso,
                estado: body.state,
                descripcion: body.description,
                trakingNumber,
                imageUrl,
                usuario: {
                    connect: {
                        idUsuario: parseInt( req.headers.idUser),
                    }
                },
                empresa:{
                    connect:{

                        idEmpresa: parseInt(body.idEmpresa),
                    }
                }
            }
        })

        res.json({ newPackage: package.idPaquete, msj:"paquete creado" })

    } catch (error) {
        console.log({ error })
        handleHttpError(res, "BAD_REQUEST", 500)
    }
}


module.exports = {
    getPackages,
    createPackage,
};
