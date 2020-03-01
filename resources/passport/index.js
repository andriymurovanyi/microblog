const passport = require('koa-passport');
const { localStrategy, jwtStrategy } = require('./strategies');

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
