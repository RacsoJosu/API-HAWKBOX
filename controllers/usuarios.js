const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const {expo} = require("../config/notificationes"); 
const { getUserDeviceidById } = require("../repository/repository.usuarios");
const {prisma} = require("../config/database");


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
        numeroTelefono: body.phone,
        pais: body.country,
        ciudad: body.city,
        deviceid: "-",
        imagenUrl:"-"
      },
      select: {
        correo: true,
        idUsuario: true,
        nombre: true,
      },
    });
   
    

    const data = {
      token: await tokenSign(user),
      user,
    };
    res.status(201);
    res.send({ data });
  } catch (e) {
    if (e.code === 'P2002') {
      handleHttpError(res,"El correo ya existe")
      
    } else {
      
      handleHttpError(res, "ERROR_REGISTER_USER", e);
      
    }
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
        numeroTelefono: true,
        pais: true,
        contrasenia: true,
      },
    });

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
    const hashPassword = user.contrasenia;

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
        tipo: "user",
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
      where:{idUsuario},
      data:{deviceid:pushToken}
    })

    res.status(200).send({success: true, user: data})

    
  } catch (error) {
    console.log({error})
    handleHttpError(res, "HTTP_ERROR_CREATE_TOKEN")
  }
}


const sendNotification = async(req, res)=>{
  try {
    const {body} = req
    const idUsuario  = body.idUsuario;
    if (!idUsuario || !body.message) {
      handleHttpError(res, "NEED_ID_USUARIO_AND_MESSAGE", 400)
      return
    }

    const user = await getUserDeviceidById(idUsuario);
    const pushToken = user.deviceid

    if (!pushToken) {
        handleHttpError(res,"NOT_FOUND_TOKEN_USER",404)
        return
    }
    console.log({body})

    const notification = {
      to: pushToken,
      sound: "default",
      title:body.title,
      body: body.message
    }

    let receipt = await expo.sendPushNotificationsAsync([notification])

    if (receipt[0].status==="ok") {
      res.json({success: true, receipt})
      
    }else{
      res.status(500).json({error:"Error al enviar la notificación", receipt})
    }


    res.json({user})
  } catch (error) {
    console.log({error})
    handleHttpError(res,"HTTP_ERROR_SEND_NOTIFICATION", 500)
  }
}

module.exports = { registerUser, login, createToken, sendNotification };
