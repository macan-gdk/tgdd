var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var sanpham = require('../controllers/sanpham');

router.post('/sanpham',passport.authenticate('jwt', { session: false }), sanpham.create);

router.get('/sanpham', sanpham.findAll);

router.get('/sanpham/top12', sanpham.top12);
router.get('/sanpham/top12/:masanpham', sanpham.top12ByID);
router.get('/sanpham/top12view', sanpham.top12view);
router.get('/sanpham/loaisanpham/:maloai', sanpham.findByCat);
router.put('/sanpham/upview/:masanpham', sanpham.upView);

router.get('/sanpham/:masanpham', sanpham.findOne);

router.put('/sanpham/:masanpham',passport.authenticate('jwt', { session: false }), sanpham.update);

// router.put('/sanpham/updateSoLuong/:masanpham',passport.authenticate('jwt', { session: false }), sanpham.updateSoLuong);
router.put('/sanpham/updateSoLuong/:masanpham', sanpham.updateSoLuong);

router.delete('/sanpham/:masanpham',passport.authenticate('jwt', { session: false }), sanpham.delete);

module.exports = router;
