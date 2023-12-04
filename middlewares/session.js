const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")

const authMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 401);
            return
        }

        // obtencion del token 

        const token = req.headers.authorization.split(" ").pop();
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        req.headers.idUser = dataToken.idUser

        next()

    } catch (error) {
        console.log(error)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware