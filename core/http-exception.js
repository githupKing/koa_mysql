class HttpException extends Error{
    constructor(msg='服务器异常',errorCode=10000,code = 400){
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}
class Parametarxception extends HttpException{
    constructor(msg,errorCode){
        super()
        this.msg = '参数错误' || msg
        this.errorCode = errorCode || 10000
    }
}
module.export = {
    httpException,
    Parametarxception
}