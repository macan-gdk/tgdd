var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var loaisanpham = require('../controllers/loaisanpham');

router.post('/loaisanpham',passport.authenticate('jwt', { session: false }), loaisanpham.create);

router.get('/loaisanpham', loaisanpham.findAll);

router.get('/loaisanpham/:maloai', loaisanpham.findOne);

router.put('/loaisanpham/:maloai',passport.authenticate('jwt', { session: false }), loaisanpham.update);

router.delete('/loaisanpham/:maloai',passport.authenticate('jwt', { session: false }), loaisanpham.delete);

module.exports = router;
