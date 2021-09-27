const Models = require('../database/models');
const { respondWithSuccess, respondWithWarning } = require('../helpers/responseHandler');

async function postComment(req, res, next) {
    const { comment } = req.body;
    const commentlength = comment.split(' ').length;
    if (commentlength > 500) return respondWithWarning(res, 400, 'comment should not be more than 500 characters');
    const { movieId } = req.params;
    try {
        const commentCreated = await Models.Comments.create({
            content: comment,
            movieId,
            publicIp: req.ip
        })
        return respondWithSuccess(res, 200, 'comment posted successfully', commentCreated);
    }
    catch (error) {
        return respondWithWarning(res, 500, 'internal server error', error.message)
    }
}


async function getComments(req, res, next) {
    const { movieId } = req.params;
    try {
        const comments = await Models.Comments.findAll({
            where: { movieId },
            order: [
                ['createdAt', 'DESC'],
            ]
        })
        if (!comments.length) return respondWithSuccess(res, 200, 'no comment found');
        return respondWithSuccess(res, 200, 'comments fetched successfully', comments)
    }
    catch (error) {
        return respondWithWarning(res, 500, 'internal server error', error.message)
    }
}


module.exports = {
    postComment,
    getComments
}