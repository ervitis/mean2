'use strict';

const express = require('express');
const UserController = require('../controllers/user_controller');
const validate = require('express-validation');
const userValidators = require('../models/validators/user');

const apiUser = express.Router();

const md_auth = require('../middlewares/authenticated');

apiUser.post('/user/save', validate(userValidators), UserController.saveUser);
apiUser.post('/user/login', UserController.loginUser);
apiUser.put('/user/update/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = apiUser;
