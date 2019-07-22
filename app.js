const koa = require('koa');
const catchError = require('./middlewares/exception');
const InitManager = require('./core/init')
const app = new koa();

InitManager.initCore(app)
app.use(catchError)

app.listen(3000)