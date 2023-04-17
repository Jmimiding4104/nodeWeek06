var express = require('express');
var router = express.Router();
const multer = require('multer')
var path = require('path');
const handleSuccess = require('../service/handleSuccess');
const errorHandle = require('../service/errorHandle');
require('dotenv').config();

const uploads = multer({
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。');
    }
    cb(null, true);
  },
}).any();

const { ImgurClient } = require('imgur');
const { Console } = require('console');

router.post('/', function (req, res, next) {
  uploads(req, res, async () => {
    try {
      const client = new ImgurClient({
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN,
      });
      const response = await client.upload({
        image: req.files[0].buffer.toString('base64'),
        type: 'base64',
        album: process.env.ALBUM
      });
      const resp = {
        id: response.data.id,
        link: response.data.link
      }
      handleSuccess(res, resp);
    } catch (error) {
      errorHandle(res)
    }
  })
});

module.exports = router;