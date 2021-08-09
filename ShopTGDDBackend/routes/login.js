var express = require('express');
var router = express.Router();

var login = require('../controllers/login');

// Create a new Note
router.post('/login', login.log);

module.exports = router;
