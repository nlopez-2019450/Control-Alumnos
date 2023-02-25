'use strict'


const express = require("express");
const app = express();

const {connection} = require("./src/database/connection")
let port = 3000;
const routes = require ('./src/routes/user.routes');


//Baes de datos
connection();


//Middlewares
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api', routes);

app.listen(port, function(){
    console.log(`El servidor está corriendo en el puerto ${port}`)
});