const express = require('express');
const { scan } = require('../middleware/parameterValidator');
const { verify } = require('../middleware/jwtValidator');

const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/fetch/all', accountController.fetchAll);

router.get('/fetch/:id', verify, accountController.fetch);

router.post('/add', scan('account-add') , accountController.add);

router.post('/authenticate', scan('account-authenticate'), accountController.authenticate);

router.patch('/modify/:id', verify, accountController.modify);

router.delete('/delete/:id', verify, accountController.delete);

module.exports = router;