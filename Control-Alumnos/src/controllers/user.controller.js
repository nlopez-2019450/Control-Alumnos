'use strict'

const UserModel = require ('../models/user.model')
const CoursesModel = require('../models/courses.model')
const bcrypt = require("bcrypt");
const {generateJWT} = require ('../helpers/create-jwt')

//Crear Usuario

const createUser = async (req, res) =>{
    const {username, email, carnet, password} = req.body;
    try{
        let user = await UserModel.findOne({email});

        if(user){
            return res.status(400).send({
                ok: false, 
                message: `Un usuario ya posee el correo ${email}`, 
                user:user
            });
        }

        user = new UserModel(req.body);

        //Encriptación de contraseña
        const salt =  bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        //Guardar Usuarios 
        user = await user.save();       

        //Generar Token
        const token = await generateJWT(user.id, user.username, user.email)
        res.status(200).send({
            message: `usuario ${user.username} creado correctamente`,
            user,
            token : token
        });
  

    }catch(error){
        console.log(error)
        throw new Error(error)
    }
};

const listUsers = async (req, res) =>{
    try{
        const users = await UserModel.find();
        if(!users){
            res.status(400).send({message: 'No hay usuarios disponibles'})
        }else{
            res.status(200).send({usuarios_obtenidos: users})
        }
    }catch(console){
        throw new Error('Error al listar usuarios')
    }
}

const updateUser = async (req, res) =>{
    try{
        const id = req.params.id; //req.params para obtener el valor del .id
        const userEdit = {...req.body}
        //Encriptar contraseña
        userEdit.password = userEdit.password
            ? bcrypt.hashSync(userEdit.password, bcrypt.genSaltSync())
            : userEdit.password;
        const userComplete = await UserModel.findByIdAndUpdate(id, userEdit, {new: true})
        if(userComplete){
            const token = await generateJWT(userComplete.id, userComplete.username, userComplete.email)
            return res.status(200).send({
                message: 'Usuario actualizado correctamente',
                userComplete, 
                token
            })           
        }else{
            res.status(400).send({
                message: 'Este usuario no existe en la base de datos, verificar parámetros'
            })            
        }
    }catch(error){
        throw new Error(error);
    }
}

const deleteUser = async(req, res) =>{    
    try{
        const id = req.params.id;
        const result = await UserModel.findByIdAndDelete(id);
        res.status(200).send({
            mesage: 'Usuario eliminado correctamente', user: result
        });
    }catch(error){
        res.status(400).send({
            message: 'Error en la petición'
        })
        throw new Error(error);
    }
}

const addCourses = async(req, res) =>{
    try{
        const id = req.params.id;
        const findCourses = await UserModel.findById(id);
        if(!findCourses){
            res.status(400).send({
                message: 'Este usuario no existe en la base de datos'
            })
        }else{
            const fillCourses = await UserModel.findByIdAndUpdate(id,{
                $push:{
                    courses: req.body                    
                },  
                new:true           
            })
            res.status(200).send({
                message: 'Curso asignado correctamente',
                fillCourses
            })
        }
    }catch(error){
        throw new Error('Error al agregar asignatura', error)
    }
}

const deleteCourses = async(req, res) =>{
 //   if(req.UserModel.rol === 'PROFESOR'){
        try{
            //const course = await UserModel.find({courses:[req.params.course]}) //Buscar por una cadena de texto
            const course = req.params.course
            const result = await CoursesModel.find({name: course})


            if (!course){
                return res.status(400).send({message: 'El curso que intenta eliminar no existe'});
            }

            console.log('Si funcionó')
            
           // await UserModel.updateMany()

        }catch(error){
                throw new Error(error);
            }
            
            
        }
//}







const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    try{
        //Verificar si el usuario existe
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).send({ok: false, message: 'El usuario no existe'});            
        }
        //Compara las contraseñas
        const validPassword = bcrypt.compareSync(
            password, //El que nosotros mandamos
            user.password //El que está registrado en la base de datos
        ) 
        if(!validPassword){
            return res.status(400).send({
                ok: false,
                message: 'Password incorrecto'
            })            
        }
        const token = await generateJWT(user.id, user.username, user.email)
        res.json({
            ok: true,
            uId: user.id,
            name: user.username,
            email: user.email,
            token
        })
    }catch(error){
        res.status(400).json({
           ok: false,
           message: 'Hablar con el administrador, Usuario no registrado'        
        })
    }
}





module.exports = {loginUser, createUser, listUsers, updateUser , deleteUser, addCourses,deleteCourses }