const jwt = require('jsonwebtoken');
const validator = require('validator');
const appError = require('../service/appError');

const users = require('../model/users');

const generateSendJWT= async (user,statusCode,res) => {
    if(!validator.isEmail(user.email)){
        return next(appError(400, '信箱格式錯誤!!'));
    }
    const findUser = await users.findOne({'email':user.email});
    const id = findUser.id;
    const token = await jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
      });
    res.status(statusCode).json({
        status: 'success',
        user:{
            token,
            name:user.name
        }
    })
}

module.exports = generateSendJWT;