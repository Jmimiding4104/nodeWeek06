var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/users');
const handleErrorAsync = require('../service/handleErrorAsync');
const isAuth = require('../service/isAuth');

/* GET users listing. */
router.get('/', UsersControllers.getUsers);

router.post('/', UsersControllers.createUsers);

router.post('/register', handleErrorAsync(UsersControllers.registerUser));

router.post('/login', handleErrorAsync(UsersControllers.loginUser));

router.post('/updatepassword',isAuth, handleErrorAsync(UsersControllers.updatePassword));

router.get('/profile',isAuth, handleErrorAsync(UsersControllers.profileUser));

router.patch('/profile',isAuth, handleErrorAsync(UsersControllers.profileUser));

module.exports = router;

