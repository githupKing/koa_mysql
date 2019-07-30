const requireDirectory = require('require-directory');
const Router = require('koa-router');
class InitManager{
    static initCore(app){
        InitManager.initLoadRouters(app)
    }
    static initLoadRouters(app){
        const apiDirecyory = `${process.cwd()}/app/api`
        requireDirectory(module,apiDirecyory,{visit:whenLoadModule});
        function whenLoadModule(obj){
            if(obj instanceof Router){
                app.use(obj.routes())
            }
        }
    }
}
module.exports = InitManager