const express = require('express');
const { scan } = require('../middleware/parameterValidator');
const { verify } = require('../middleware/jwtValidator');

const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/fetch/all', verify, accountController.fetchAll);

router.get('/fetch/:id', accountController.fetch);

router.post('/add', scan('account-add') , accountController.add);

router.post('/authenticate', scan('account-authenticate'), accountController.authenticate);

router.patch('/modify/:id', accountController.modify);

router.delete('/delete/:id', accountController.delete);

module.exports = router;