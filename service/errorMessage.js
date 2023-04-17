const errorMessage = function (err) {
    if (err.isOperational) {
        return err.message
    } else {
        const message = [];
        if (err.errors?.user?.name == "CastError") {
            message.push('輸入格式錯誤的 ObjectId !!')
        }
        if (err.errors?.content?.message == "Content 未填寫") {
            message.push("Content 未填寫")
        }
        if (err.name == "CastError") {
            message.push('輸入格式錯誤的 ObjectId !!')
        }
        return message;
    }
}

module.exports = errorMessage;