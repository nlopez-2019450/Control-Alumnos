const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const connection = async() =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ControlAlumnos');
        console.log('Conectado a la base de datos!! OwO');
    }catch(error){
        console.log(error);
        throw new Error ('Error al conectar a la db')
    }      
}

module.exports = { connection }