function errorHandle(res) {
  res.status(400).json({
    'status': 'false',
    'message': '欄位未填寫正確'
  })
};

module.exports = errorHandle;