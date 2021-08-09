var LoginModel = require('../models/login');
var cm = require('../models/login');

var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'CanMT';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    next(null, jwt_payload)
});
passport.use(strategy);

exports.log = function (req, res) {
    var value = req.body;
    LoginModel.login(value, function (err, data) {
        if (err) {
            res.status(401).json({ message: "Username and Password not matched" });
            return;
        }
        if (data.length <= 0) {
            res.status(401).json({ message: "Username and Password not matched" });
            return;
        }

        var payload = { id: data[0].id, email: data[0].email, role: data[0].role };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ token: token, email: data[0].email, firstname: data[0].firstname, id: data[0].id, role: data[0].role, lastname: data[0].lastname, address: data[0].address, phone: data[0].phone });
    });

};