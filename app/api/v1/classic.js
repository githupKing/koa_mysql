const Router = require('koa-router');

const router = new Router({
	prefix:'/v1/classic'
})
const { PositiveIntergerValidator } = require('../../validators/validator')
const { ParameterException } = require('../../../core/http-exception')
const Auth = require('../../../middlewares/auth')
router.get('/latest',new Auth().m,(ctx,next)=>{
	ctx.body= ctx.auth.uid
})

module.exports = router;