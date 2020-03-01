const passportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const { jwtSecret } = require('../../config');
const model = require('../../models');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret
};

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async function(email, password, done) {
        const user = await model.User.findOne({ email });

        if (!user || !user.checkPassword(password)) {
            return done(null, false, { message: 'User does not exist or wrong password.' });
        }

        return done(null, user);
    }
);

const jwtStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
    model.User.findById(payload.id, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
});

module.exports = {
    localStrategy,
    jwtStrategy
};
