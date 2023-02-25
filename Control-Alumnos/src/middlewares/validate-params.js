const {validationResult} = require('express-validator') //Librería para validar datos antes que sean enviados a la petición

const validateParams = async(req,res, next) =>{
    const errors = validationResult(req) //Para el manejo de errores
    if(!errors.isEmpty()){
        return res.status(400).send({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {validateParams}