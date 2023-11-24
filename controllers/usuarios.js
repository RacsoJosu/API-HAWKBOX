const {UsuarioModel} = require("../models")
const {encrypt,compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt");
const {handleHttpError} = require("../utils/handleError")



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * encargado para registrar una persona
 */

const registerUser = async (req,res)=>{
    try{
        const {body} = req
        body.password_encrypt = await encrypt(body.password);
        console.log({body})

        const dataUser = await UsuarioModel.create(
            {
    
                nombre: body.name,
                correo: body.email,
               contrasenia:body.password_encrypt,
                numero_telefono:body.phone,
                pais:body.country,
                ciudad:body.city            
            });
        
        const data = {
          token: await tokenSign(dataUser),
          user: {email:dataUser.correo, id:dataUser.idUsuario, name:dataUser.name},
        };
        res.status(201)
        res.send({ data });
      }catch(e){
       
        if (e.errors[0].validatorKey == 'not_unique') {
            
            handleHttpError(res, "ERROR_EMAIL_EXISTS", 400)
            return    
            
        }else{
            handleHttpError(res, "ERROR_REGISTER_USER")
        }

    }
}
/**
 * encargado de logear un usuarip
 * @param {*} req 
 * @param {*} res 
*/

const login = async (req,res) =>{
    

    try {
        const {body} = req
        const user = await UsuarioModel.findOne({where:{correo:body.email}})

      
        if (!user) {
            handleHttpError(res,"USER_NOT_EXISTS",404)
            return
        }
        const hashPassword= user.contrasenia;
        console.log({user})
        console.log({hashPassword, password: user.contrasenia})
        const check = await compare(body.password,hashPassword)
       
        if (!check) {
            handleHttpError(res,"PASSWORD_INVALID",401)
            return
        }
     
        
        const data= {
            token: await tokenSign(user),
            user:{
                idUsuario: user.idUsuario,
                nombre: user.nombre,
                correo:user.correo,
                tipo: user.tipo,
                numero_telefono:user.numero_telefono,
                pais: user.pais,
                }
        }
        res.send({data})
        
    } catch (error) {
        console.log(error)
        
        handleHttpError(res,"HTTP_ERROR_LOGIN_USER")
    }

}


module.exports = {registerUser,login}