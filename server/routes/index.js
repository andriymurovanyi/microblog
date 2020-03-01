const Router = require('koa-router');
const router = new Router();
const controllers = require('../controllers');
const checkAuth = require('../middleware/auth');

// User routes
router.post('/register', controllers.user.create);
router.post('/login', controllers.user.login);

// Articles routes
router.get('/articles', checkAuth, controllers.articles.index);

module.exports = router;
