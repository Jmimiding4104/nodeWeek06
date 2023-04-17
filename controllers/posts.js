const handleSuccess = require('../service/handleSuccess');
const errorHandle = require('../service/errorHandle');
const appError = require('../service/appError')

const posts = require('../model/posts')
const users = require('../model/users')

const post = {
    async getPosts(req, res) {
        const timeSort = req.query.timeSort == 'asc' ? 'createAt' : '-createAt';
        const q = req.query.q !== 'undefined' ? { content: new RegExp(req.query.q) } : {};
        console.log(q)
        const allPosts = await posts.find(q).populate({
            path: "user",
            select: "name photo",
        }).sort(timeSort);
        handleSuccess(res, allPosts);
    },
    async createPosts(req, res, next) {
        const data = req.body;
        if (data.user) {
            const newPost = await posts.create(
                {
                    user: data.user,
                    content: data.content,
                    tags: data.tags,
                    type: data.type,
                    likes: data.likes,
                    comments: data.comments,
                    image: data.image
                }
            );
            handleSuccess(res, newPost);
        } else if (!data.user && data.content) {
            return next(appError(400, '未填寫 ID !!'));
        } else {
            return next(appError(400, '未填寫 ID 與 content !!'));
        }
    },
    async deleteAll(req, res, next) {
        const deleteAllPosts = await posts.deleteMany({});
        handleSuccess(res, deleteAllPosts);
    },
    async deleteOne(req, res, next) {
        const id = req.params.id
        console.log(id)
        const findId = await posts.findOne({ '_id': id })
        if (findId === null) {
            return next(appError(400, "查無此 ID !!"));
        } else {
            const deleteById = await posts.findByIdAndDelete(id);
            handleSuccess(res, deleteById);
        }
    },
    async updataOne(req, res, next) {
        const id = req.params.id
        const data = req.body;
        const findId = await posts.findOne({ '_id': id })
        if (data.content) {
            const newPost = await posts.updateOne(
                {
                    '_id': id
                },
                {
                    user: data.user,
                    content: data.content,
                    tags: data.tags,
                    type: data.type,
                    likes: data.likes,
                    comments: data.comments
                }
            );
            handleSuccess(res, newPost);
        } else if (data.content == "") {
            return next(appError(400, "請輸入 content !!"));
        }
    }
}

module.exports = post;