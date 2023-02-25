'use strict'

const CoursesModel = require('../models/courses.model')


const createCourse = async(req,res) =>{
    const {name, CA} = req.body;
    try{
        let course = await CoursesModel.findOne({name});
        if(course){
            return res.status(400).send({
                ok: false,
                message: `El curso ${name}, ya está registrado`
            }) 
        }
        course = new CoursesModel(req.body);

        res.status(200).send({
            message: `El curso ${name} fue registrado satisfactoriamente`,
            ok: true,
            curso: course
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: `No se pudo registrar el curso de: ${username}`,
            error: error
        })
    }
}   



module.exports = {createCourse}