const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '貼文姓名未填寫']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'private']
    },
    email: {
        type: String,
        require: [true, '請輸入電子郵件'],
        unique: true,
        lowercase: true,
        select: false
    },
    password: {
        type: String,
        require: [true, '請輸入密碼'],
        minlength: 8,
        select: false
    },
    photo: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false }
});

const users = mongoose.model(
    'users',
    usersSchema
)

module.exports = users;