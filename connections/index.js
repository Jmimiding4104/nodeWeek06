const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DATABASE.replace(
  //如果有這個
  '<password>',
  //替換成這個
  process.env.DATABASE_PASSWORD
)

const connectDB = () => {
  mongoose.connect(DB)
    .then(() => {
      console.log('連結資料庫成功')
    })
    .catch(() => {
      console.log('資料庫連結失敗')
    })
}

module.exports = connectDB

