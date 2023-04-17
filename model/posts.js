const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, '使用者 ID 未填寫']
    },
    tags: [
        {
            type: String,
        }
    ],
    type: {
        type: String,
        enum: ['group', 'person'],
    },
    image: {
        type: String,
        default: ""
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: [true, 'Content 未填寫'],
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
});

const posts = mongoose.model(
    'posts',
    postsSchema
)

module.exports = posts;