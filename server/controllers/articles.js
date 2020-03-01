const index = async (ctx) => {
    console.log('Welcome! Now you can see a list of all articles')

    ctx.body = {
        message: `Success data access for ${ctx.user.email}!`
    }
};

module.exports = {
    index
};
