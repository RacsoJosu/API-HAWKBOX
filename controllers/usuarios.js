const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");

const { prisma } = require("../config/database");

/**
 *
 * @param {*} req
 * @param {*} res
 * encargado para registrar una persona
 */

const registerUser = async (req, res) => {
  try {
    const { body } = req;
    body.password_encrypt = await encrypt(body.password);

    const user = await prisma.usuarios.create({
      data: {
        nombre: body.name,
        correo: body.email,
        contrasenia: body.password_encrypt,
        numero_telefono: body.phone,
        pais: body.country,
        ciudad: body.city,
      },
      select: {
        correo: true,
        idUsuario: true,
        nombre: true,
      },
    });

    const data = {
      token: await tokenSign(dataUser),
      user,
    };
    res.status(201);
    res.send({ data });
  } catch (e) {
    
    handleHttpError(res, "ERROR_REGISTER_USER", e);
    
  }
};
/**
 * encargado de logear un usuarip
 * @param {*} req
 * @param {*} res
 */

const login = async (req, res) => {
  try {
    const { body } = req;
    const user = await prisma.usuarios.findUnique({
      where: {
        correo: body.email,
      },
      select: {
        idUsuario: true,
        nombre: true,
        correo: true,
        tipo: true,
        numero_telefono: true,
        pais: true,
        contrasenia: true,
      },
    });

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const hashPassword = user.contrasenia;
    console.log({ user });
    console.log({ hashPassword, password: user.contrasenia });
    const check = await compare(body.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const data = {
      token: await tokenSign(user),
      user: {
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        correo: user.correo,
        tipo: user.tipo,
        numero_telefono: user.numero_telefono,
        pais: user.pais,
      },
    };
    res.send({ data });
  } catch (error) {
    console.log(error);

    handleHttpError(res, "HTTP_ERROR_LOGIN_USER");
  }
};

const createToken = async (req, res)=>{
  try {
    const {idUsuario, pushToken} = req.body;

    if (!idUsuario || !pushToken ) {
      handleHttpError(res, "Se requiere del UsuarioId y un pushToken valido")
      return
    }

    const data = await prisma.usuarios.update({
      where:{idUsuario, deviceid: pushToken}
    })

    res.status(200).send({success: true, user: updateUser})

    
  } catch (error) {
    console.log({error})
    handleHttpError(res, "HTTP_ERROR_CREATE_TOKEN")
  }
}


module.exports = { registerUser, login, createToken };
