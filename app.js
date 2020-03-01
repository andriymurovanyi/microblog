const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('./config');
const serve = require('koa-static');
const mongoose = require('mongoose');
const body = require('koa-body');
const logger = require('koa-logger');
const passport = require('./resources/passport');
const router = require('./server/routes');

const app = new Koa();

mongoose.connect(process.env.MONGODB_URI || config.db.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => {
    console.log(error);
});

app.use(passport.initialize());
app.use(logger());
app.use(cors());
app.use(body());
app.use(serve(__dirname + '/public'));
app
    .use(router.routes())
    .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

if (!module.parent) {
    console.log(`Server started at ${PORT} port...`);
    app.listen(PORT);
}
