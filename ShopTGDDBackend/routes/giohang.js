var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var giohang = require('../controllers/giohang');

// Create a new Note
router.post('/giohang', passport.authenticate('jwt', { session: false }), giohang.create);
// Retrieve a single Note with noteemail
// router.get('/giohang/:email', passport.authenticate('jwt', { session: false }), giohang.findOne);
router.get('/giohang/:email', passport.authenticate('jwt', { session: false }), giohang.findOne);
// Update a Note with email
// router.put('/giohang/:email', passport.authenticate('jwt', { session: false }), giohang.update);
router.put('/giohang', passport.authenticate('jwt', { session: false }), giohang.update);

// Delete a Note with email
// router.delete('/giohang/:email', passport.authenticate('jwt', { session: false }), giohang.delete);
router.delete('/giohang', passport.authenticate('jwt', { session: false }), giohang.delete);

module.exports = router;