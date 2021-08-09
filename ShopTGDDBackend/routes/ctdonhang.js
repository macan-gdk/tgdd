var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var ctdonhang = require('../controllers/ctdonhang');

router.post('/ctdonhang',passport.authenticate('jwt', { session: false }), ctdonhang.create);

router.get('/ctdonhang',passport.authenticate('jwt', { session: false }), ctdonhang.findAll);

router.get('/ctdonhang/:madonhang',passport.authenticate('jwt', { session: false }), ctdonhang.findOne);

router.put('/ctdonhang/:madonhang',passport.authenticate('jwt', { session: false }), ctdonhang.update);

router.delete('/ctdonhang/:madonhang',passport.authenticate('jwt', { session: false }), ctdonhang.delete);

module.exports = router;
