const passport = require('koa-passport');

module.exports = async(ctx, next) => {
    await passport.authenticate('jwt', async function (err, user) {
        if (user) {
            ctx.user = user;
            return await next();
        } else {
            ctx.throw(404, 'noSuchUser');
        }
    })(ctx, next)
};
