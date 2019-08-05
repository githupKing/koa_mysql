const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db')

const {Sequelize,Model} = require('sequelize')

class User extends Model{
	static async verifyEmailPassword(email,plainPassword){
		const user = User.findOne({
			where:{
				email
			}
		})
		if (!user) {
			throw new global.errs.NotFound('用户不存在')
		}
		const correct = bcrypt.compareSync(plainPassword,user.password)
		if (!correct) {
			throw new global.errs.AuthFailed()
		}
		return user
	}
}
User.init({
	id:{
		type:Sequelize.INTEGER,
		primaryKey:true, //主键
		autoIncrement:true //自动增长
	},
	nickname:Sequelize.STRING,
	email:{
		type:Sequelize.STRING(128),
		unique:true, //唯一
	},
	password:{
		type:Sequelize.STRING,
		set(val){
			const salt = bcrypt.genSaltSync(10) //密码加密 盐
			const psw = bcrypt.hashSync(val,salt) //加密过程
			this.setDataValue('password',psw)
		}
	},
	openid:{
		type:Sequelize.STRING(64),
		unique:true, //唯一
	}
},{
	sequelize,
	tableName:'user'
})
module.exports = {
	User
}