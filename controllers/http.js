const http = {
    notFound(req, res) {
        res.status(404).json({
            'status': false,
            'message': '此路由不存在'
        })
    }
};

module.exports = http;