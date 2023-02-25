'use strict'

const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const UserSchema = Schema({
    username:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    carnet:{
        type: String,
        require: true
    },
    rol:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },   
    courses:[{
        name:{
            type: String
        },
        CA:{
            type: String 
        }
    }]

});


module.exports = mongoose.model('User', UserSchema);

