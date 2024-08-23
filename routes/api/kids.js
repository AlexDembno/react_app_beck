const express = require('express');
const router = express.Router();
const db = require('./../../server');
const { authenticate } = require('../../middlewares');

const { addKids, kidsLogin } = require('../../controller/kids');

// router.post('/addkids', authenticate, addKids);

router.post('/login', kidsLogin);

module.exports = router;
