const models =  {
    UsuarioModel: require('./usuario'),
    PaqueteModel: require('./paquetes'),
    UbicacionModel: require('./ubicacion'),
    //Nuevos Jesus 2/12/23
    
    UbicacionClienteModel: require('./ubicacionCliente'),
    TransitoModel: require('./transito'),
    Cobro_EnviosModel: require('./cobros_envios'),
    CasilleroModel: require('./casillero')
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



// nuevos -Jesus   2/12/23


module.exports = models
