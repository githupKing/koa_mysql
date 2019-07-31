const Router = require('koa-router');

const router = new Router()

const { PositiveIntergerValidator } = require('../../validators/validator')
const { ParameterException } = require('../../../core/http-exception')

router.post('/v1/:id/classic/latest',(ctx,next)=>{
    const path = ctx.params;
    const query = ctx.request.query;
    const header = ctx.request.header;
    const body = ctx.request.body;
	const v = new PositiveIntergerValidator().validate(ctx)
})

module.exports = router;