const {PaqueteModel} = require('../models');

const findAllPackages = async (id)=> await PaqueteModel.findAll({where:{idUsuario:id}})

module.exports = {
    findAllPackages
};
