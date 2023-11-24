const models =  {
    UsuarioModel: require('./usuario'),
    PaqueteModel: require('./paquetes'),
    UbicacionModel: require('./ubicacion')

}

models.UsuarioModel.Paquetes= models.UsuarioModel.hasMany(models.PaqueteModel,{
    foreignKey:"idUsuario"
});

models.PaqueteModel.Usuario = models.PaqueteModel.belongsTo(models.UsuarioModel,{
    foreignKey:"idUsuario"
})




models.PaqueteModel.PaquetesHijos= models.PaqueteModel.hasMany(models.PaqueteModel,{
    foreignKey:"paquetePadreId"
});

models.PaqueteModel.PaquetePadre = models.PaqueteModel.belongsTo(models.PaqueteModel,{
    foreignKey:"paquetePadreId"
})






models.PaqueteModel.Ubicaciones= models.PaqueteModel.hasMany(models.UbicacionModel,{
    foreignKey:"idPaquete"
});

models.UbicacionModel.Paquete= models.UbicacionModel.belongsTo(models.PaqueteModel, {
    foreignKey:"idPaquete"
})





module.exports = models
