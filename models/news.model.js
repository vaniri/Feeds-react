const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema ({
    source: String,
    headline: String,
    author: String,
    pubDate:  String,
    summary: String,
    url: {
        type: String,
        unique: true
    }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;