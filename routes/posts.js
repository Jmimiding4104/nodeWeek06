var express = require('express');
var router = express.Router();

const PostsControllers = require('../controllers/posts');
const handleErrorAsync = require('../service/handleErrorAsync')

/* GET users listing. */
router.get('/', handleErrorAsync(PostsControllers.getPosts));

router.post('/', handleErrorAsync(PostsControllers.createPosts));

router.delete('/', handleErrorAsync(PostsControllers.deleteAll));

router.delete('/:id', handleErrorAsync(PostsControllers.deleteOne));

router.patch('/:id', handleErrorAsync(PostsControllers.updataOne));

module.exports = router;
