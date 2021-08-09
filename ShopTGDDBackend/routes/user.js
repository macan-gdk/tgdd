var express = require('express');
var router = express.Router();
var passport = require('../models/jwtService');
var user = require('../controllers/user');

// Create a new Note
router.post('/user', user.create);
router.post('/checkemail', user.checkEmail);
router.post('/forgotpassword', user.forgot);
//Create by admin
router.post('/createbyadmin', passport.authenticate('jwt', { session: false }), user.createByAdmin);
// Retrieve all user
router.get('/user', passport.authenticate('jwt', { session: false }), user.findAll);

// Retrieve a single Note with noteId
router.get('/user/:id', passport.authenticate('jwt', { session: false }), user.findOne);

// Update a Note with id
router.put('/user/:id', passport.authenticate('jwt', { session: false }), user.update);

// Delete a Note with id
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), user.delete);

module.exports = router;



// app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//     res.json("Success! You can not see this without a token");
// });
