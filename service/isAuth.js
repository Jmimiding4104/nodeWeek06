const appError = require('./appError');
const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    let token = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return next(appError(401, '你沒有登入!!'));
    }

    const decoded = await new Promise ((resolve, reject) => {
        jwt.verify(token,process.env.JWT_SECRET,(error,payload) => {
            if(error){
                reject(error);
                return next(appError(400, 'token 錯誤!!'));
            }else{
                resolve(payload)
            }
        })
    });
    const currentUser = decoded.id;
    req.user = currentUser;
    next();
}

module.exports = isAuth;