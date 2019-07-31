const { LinValidator,Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
class PositiveIntergerValidator extends LinValidator{
	constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            }),
        ]
    }
}
class RegisterValidator extends LinValidator{
	constructor(){
		super()
		this.email = [
			new Rule('isEmail','不符合email规范')
		]
		this.password1 = [
			new Rule('isLength','密码长度在6-32',{min:6,max:32}),
			new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
		]
		this.password2 = this.password1
		this.nickname = [
			new Rule('isLength','昵称不符合规范',{min:4,max:32}),
		]
	}
	validatePassword(vals){
		const psw1 = vals.body.password1;
		const psw2 = vals.body.password2;
		if (psw1 !== psw2) {
			throw new Error('两个密码必须相等')
		}
	}
	async validateEmail(vals){
		const email = vals.body.email;
		const user = await User.findOne({
			where:{
				email:email
			}
		})
		if(user){
			throw new Error('email 已经存在')
		}
	}
}
module.exports = {
	PositiveIntergerValidator,
	RegisterValidator
} 