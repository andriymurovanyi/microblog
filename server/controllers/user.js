const jwt = require('jsonwebtoken');
const model = require('../../models');
const passport = require('../../resources/passport');
const { jwtSecret } = require('../../config');

const create = async(ctx) => {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
        ctx.throw(400, 'badRequest');
    }

    ctx.body = await model.User.create({
        email,
        password
    });
};

const login = async(ctx, next) => {
    await passport.authenticate('local', (err, user) => {
        if (!user) {
            ctx.throw(404, 'noSuchUser');
        } else {
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, jwtSecret);

            ctx.body = {
                user,
                token: `JWT ${token}`
            };
        }
    })(ctx, next);
};

module.exports = {
    create,
    login
};
