const bcryptsjs= require("bcryptjs")
// cotraseña sin encriptar
const encrypt = async (passwordPlain)=>{
   
    const hash = await bcryptsjs.hash( passwordPlain,10)
   
    return hash 


}

const compare = async (passwordPlain,hashPassword)=>{
    
    return await bcryptsjs.compare(passwordPlain,hashPassword)


}

module.exports = {encrypt,compare}