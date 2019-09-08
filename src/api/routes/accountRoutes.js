const express = require('express');
const passport = require('passport');
const { scan } = require('../middleware/parameterValidator');

const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/fetch/all', accountController.fetchAll);

router.get('/fetch/:id', accountController.fetch);

router.post('/add', scan('account-add') , accountController.add);

router.post('/authenticate', scan('account-authenticate'), accountController.authenticate);

router.patch('/modify/:id', accountController.modify);

router.delete('/delete/:id', accountController.delete);

module.exports = router;