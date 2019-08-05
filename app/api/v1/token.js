const Router = require('koa-router');
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const {User} = require('../../models/user')
const { generateToken } = require('../../../core/util')
// const success = require('../../lib/helper')
const router = new Router({
	prefix:'/v1/token'
})

router.post('/',async(ctx)=>{
	let token;
	const v = TokenValidator().validate(ctx);
	switch(v.get('body.type')){
		case LoginType.USER_EMAIL:
		 	token = emailLogin(v.get('body.account'),v.get('body.secret'))
		case Location.USER_MINI_PROGRAM:
			break;
		default:
			throw new global.errs.ParameterException('没有相应的处理函数')
	}
	ctx.body={
		token
	}
	// success()
})
//验证邮箱密码是否正确
async function emailLogin(account,secret){
	const user = await User.verifyEmailPassword(account,secret)
	return generateToken(user.id,2)
}
module.exports = router