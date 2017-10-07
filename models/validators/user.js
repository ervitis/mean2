'use strict';

const Joi = require('joi');


module.exports = {
    body: {
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
        rol: Joi.string().required(),
        image: Joi.string().required()
    }
};