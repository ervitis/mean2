'use strict';

const express = require('express');
const UserController = require('../controllers/user_controller');
const validate = require('express-validation');
const userValidators = require('../models/validators/user');

const apiUser = express.Router();

apiUser.post('/user/save', validate(userValidators), UserController.saveUser);

module.exports = apiUser;
