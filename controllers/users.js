const handleSuccess = require('../service/handleSuccess');
const errorHandle = require('../service/errorHandle');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const appError = require('../service/appError');

const generateSendJWT = require('../service/generateSendJWT');
const users = require('../model/users')

const user = {
    async getUsers(req, res) {
        const allUsers = await users.find();
        handleSuccess(res, allUsers);
    },
    async createUsers(req, res) {
        try {
            const data = req.body;
            if (data.name) {
                const newUsers = await users.create(
                    {
                        name: data.name,
                        gender: data.gender,
                        email: data.email,
                        password: data.password,
                        photo: data.photo
                    }
                );
                handleSuccess(res, newUsers);
            } else {
                errorHandle(res);
            }
        } catch (error) {
            errorHandle(res);
        }
    },
    async registerUser(req, res, next) {
        const userData = req.body;
        if (!userData.name) {
            return next(appError(400, '暱稱未填寫!!'));
        }
        if (!validator.isLength(userData.password, { min: 8 })) {
            return next(appError(400, '密碼少於 8 碼!!'));
        }
        if (!validator.isEmail(userData.email)) {
            return next(appError(400, '信箱格式錯誤!!'));
        }
        const userPassword = await bcryptjs.hash(userData.password, 12);
        const newUser = await users.create({
            name: userData.name,
            email: userData.email,
            password: userPassword
        });
        handleSuccess(res, newUser);
    },
    async loginUser(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(appError(400, '請輸入帳號密碼!!'));
        }
        const user = await users.findOne({ email }).select('+password');
        const auth = await bcryptjs.compare(password, user.password);
        if (!auth) {
            return next(appError(400, '帳號或密碼不正確!!'));
        }
        generateSendJWT(req.body, 200, res);
    },
    async updatePassword(req, res, next) {
        const { oldPassword, newPassword, recheckPassword } = req.body;
        if (!oldPassword && !newPassword && !recheckPassword) {
            return next(appError(400, '標格填寫不完整!!'));
        };
        if (newPassword != recheckPassword) {
            return next(appError(400, '確認密碼不一致!!'));
        };
        if (newPassword == oldPassword) {
            return next(appError(400, '不可與舊密碼相同!!'));
        };
        const user = await users.findOne({ _id: req.user }).select('+password');
        const checkPassword = await bcryptjs.compare(oldPassword, user.password);
        if (!checkPassword) {
            return next(appError(400, '請確認舊密碼!!'));
        };
        const joinNewPassword = await bcryptjs.hash(newPassword, 12);
        const editPassword = await users.updateOne(
            {
                _id: req.user
            },
            {
                password: joinNewPassword
            }
        );
        handleSuccess(res, editPassword);
    },
    async profileUser(req, res, next) {
        const id = req.user;
        const userOne = await users.find({ _id: id });
        handleSuccess(res, userOne);
    },
    async profileUser(req, res, next) {
        const id = req.user;
        const { name, gender, email, photo } = req.body;
        const updateUser = await users.updateOne(
            { _id: id },
            {
                name, 
                gender, 
                photo
            }
        );
        handleSuccess(res, updateUser);
    }
}

module.exports = user;