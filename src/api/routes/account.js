const express = require('express');
const router = express.Router();

const account = require('../controllers/account');

router.get('/fetch/all', account.fetchAll);

module.exports = router;