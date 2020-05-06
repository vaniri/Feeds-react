const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema ({
    headline: String,
    author: String,
    pubDate:  String,
    summary: String,
    url: {
        type: String,
        unique: true
    },
    source: { type: Schema.Types.ObjectId, ref: 'Source' }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;