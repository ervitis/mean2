'use strict';

const express = require('express');
const UserController = require('../controllers/user_controller');
const validate = require('express-validation');
const userValidators = require('../models/validators/user');

const apiUser = express.Router();

const md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: '/tmp/uploads/users'});

apiUser.post('/user/save', validate(userValidators), UserController.saveUser);
apiUser.post('/user/login', UserController.loginUser);
apiUser.put('/user/update/:id', md_auth.ensureAuth, UserController.updateUser);
apiUser.post('/user/photo/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
apiUser.get('/user/photo/:imageFile', UserController.getImageFile);

module.exports = apiUser;
