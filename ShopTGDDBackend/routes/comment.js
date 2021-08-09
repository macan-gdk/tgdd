var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var comment = require('../controllers/comment');

router.post('/comment',passport.authenticate('jwt', { session: false }), comment.create);

router.get('/comment/:sanpham', comment.findOne);

router.put('/comment/:macomment',passport.authenticate('jwt', { session: false }), comment.update);

router.delete('/comment/:macomment',passport.authenticate('jwt', { session: false }), comment.delete);

module.exports = router;
