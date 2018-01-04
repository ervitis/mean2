'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret_key';

exports.ensureAuth = function(req, res, next) {
    if (! req.headers.authorization) {
        return res.status(403).send({message: 'authorization header missing'})
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        const payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message: 'token has expired'})
        }

        req.user = payload;
    } catch (ex) {
        console.error(ex);
        return res.status(404).send({message: 'token not valid'})
    }

    next();
};