'use strict'

const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const CoursesSchema = Schema({
    name:{
        type: String
    },
    CA:{
        type: String
    }
});



module.exports = mongoose.model('courses', CoursesSchema)