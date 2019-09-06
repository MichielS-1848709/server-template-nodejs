const express = require('express');
const passport = require('passport');

const router = express.Router();

const accountRoute = require('../controllers/account.controller');

router.get('/fetch/all', accountRoute.fetchAll);

router.get('/fetch/:id', accountRoute.fetch);

router.post('/add', accountRoute.add);

router.post('/authenticate', passport.authenticate('local', {session: false}), accountRoute.authenticate);

router.patch('/modify/:id', accountRoute.modify);

router.delete('/delete/:id', accountRoute.delete);

module.exports = router;