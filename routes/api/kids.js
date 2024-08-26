const express = require('express');
const router = express.Router();
const db = require('./../../server');
const { kidsAuthenticate } = require('../../middlewares');

const { kidsLogin, kidsLogout, kidsCurrent } = require('../../controller/kids');

router.post('/login', kidsLogin);

router.get('/current', kidsAuthenticate, kidsCurrent);

router.post('/logout', kidsAuthenticate, kidsLogout);

module.exports = router;
