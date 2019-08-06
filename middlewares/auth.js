const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth{
	constructor(){}
	get m(){
		return async (ctx,next)=>{
			const userToken = basicAuth(ctx.req);
			let errormsg = 'token不合法'
			
			if (!userToken || !userToken.name) {
				throw new global.errs.Forbbiden(errormsg)
			}
			console.log(userToken)
			try{
				var decode = jwt.verify(userToken.name,global.config.security.secretKey)
			}catch(error){
				console.log(error)
				if (error.name == 'TokenExpiredError') {
					errormsg = 'token令牌已过期'
				}
				throw new global.errs.Forbbiden(errormsg)
			}
			ctx.auth = {
				uid:decode.uid,
				scope:decode.scope
			}
			await next()
		}
	}
}

module.exports = Auth