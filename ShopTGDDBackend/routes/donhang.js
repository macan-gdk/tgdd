var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var donhang = require('../controllers/donhang');

router.post('/donhang',passport.authenticate('jwt', { session: false }), donhang.create);

router.get('/donhang',passport.authenticate('jwt', { session: false }), donhang.findAll);

router.get('/donhang/thongke/ngay', passport.authenticate('jwt', { session: false }), donhang.thongKeNgay);
router.get('/donhang/thongke/thang', passport.authenticate('jwt', { session: false }), donhang.thongKeThang);
router.get('/donhang/thongke/nam', passport.authenticate('jwt', { session: false }), donhang.thongKeNam);

router.get('/donhang/:email',passport.authenticate('jwt', { session: false }), donhang.findOne);

router.put('/donhang/:madonhang',passport.authenticate('jwt', { session: false }), donhang.update);

router.delete('/donhang/:madonhang',passport.authenticate('jwt', { session: false }), donhang.delete);


module.exports = router;
