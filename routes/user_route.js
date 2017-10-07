'use strict';

const express = require('express');
const UserController = require('../controllers/user_controller');
const validate = require('express-validation');
const userValidators = require('../models/validators/user');

const api = express.Router();

api.post('/user/save', validate(userValidators), UserController.save);

module.exports = api;
