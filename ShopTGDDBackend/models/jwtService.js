
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

module.exports = passport;