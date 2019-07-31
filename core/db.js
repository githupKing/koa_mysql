const Sequelize = require('Sequelize');
const {dbName,host,port,user,password} = require('../config/config').database;

const sequelize = new Sequelize(dbName,user,password,{
	dialect:'mysql',
	host,
	port,
	logging:true,
	timezone:'+08:00',
	define:{
		timestamp:false,
		paranoid:true,
		cretatedAt:'created_at',
		updateedAt:'updateed_at',
		deleteAt:'delete_at',
		underscored:true
	}
})
sequelize.sync({
	force:true
})

module.exports={
	sequelize
}
