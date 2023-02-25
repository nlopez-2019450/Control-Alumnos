'use strict'

const express = require ('express');
const {Router} = require ('express');
const {createUser, listUsers , updateUser , deleteUser, addCourses, loginUser} = require ('../controllers/user.controller');
const api = Router();

api.post('/create-user', createUser);
api.get('/list-users', listUsers);
api.put('/update-user/:id', updateUser);
api.delete('/delete-user/:id', deleteUser);
api.put('/add-courses/:id', addCourses);
api.post('/login', loginUser);


module.exports = api;
