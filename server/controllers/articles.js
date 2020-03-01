const index = async (ctx) => {
    ctx.body = {
        message: `Success data access for ${ctx.user.email} !`
    }
};

module.exports = {
    index
};
