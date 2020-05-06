const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    commentBody: String,
    posted: {
        type: Date,
        default: Date.now
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    newsItem: { type: Schema.Types.ObjectId, ref: 'News' }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;