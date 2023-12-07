const { prisma } = require('../config/database');
const { handleHttpError } = require('../utils/handleError');


/**
 * Selusio dku pue
 * @param {*} req 
 * @param {*} res 
 */

const createTransito = async (req, res) => {
    try {
        const { body } = req
        const fecha = new Date()
        const transitos = await prisma.transitos.create({
            data: {
                idPaquete: body.idPaquete,
                idUbicacion: body.idUbicacion,
                fecha,
                
            }
        })

        res.json({ newtransitos: transitos })

    } catch (error) {
        console.log({ error })
        handleHttpError(res, "BAD_REQUEST", 500)
    }
}




const getTransito = async (req, res) => {
    try {
        const { idPaquete } = req.body;

        // Obtener información del paquete desde la tabla paquetes
        const paqueteInfo = await prisma.paquetes.findUnique({
            where: {
                idPaquete: parseInt(idPaquete),
            },
            include: {
                empresa: true,
                transitos: {
                    include: {
                        ubicacion: {
                            select: {
                                Departamento: true,
                                Ciudad: true,
                            },
                        },
                    },
                },
            },
        });

        // Si hay información de paquete, construir la respuesta
        if (paqueteInfo) {
            const historialTransitos = paqueteInfo.transitos.map((transito) => ({
                fechaTransito: transito.fecha,
                departamento: transito.ubicacion.Departamento,
                ciudad: transito.ubicacion.Ciudad,
            }));

            const respuesta = {
                idPaquete: paqueteInfo.idPaquete,
                descripcion: paqueteInfo.descripcion,
                empresa: paqueteInfo.empresa.nombre,
                historialTransitos,
            };

            res.json(respuesta);
        } else {
            res.status(404).json({ error: 'No se encontró información para el paquete proporcionado.' });
        }

    } catch (error) {
        console.error('Error al obtener información de tránsito:', error);
        handleHttpError(res, 'BAD_REQUEST', 500);
    }
};


module.exports = {
    createTransito, 
    getTransito
};