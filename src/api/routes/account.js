const express = require('express');
const router = express.Router();

const account = require('../controllers/account');

router.get('/fetch/all', account.fetchAll);

router.get('/fetch/:id', account.fetch);

router.post('/add', account.add);

router.patch('/modify/:id', account.modify);

router.delete('/delete/:id', account.delete);

module.exports = router;