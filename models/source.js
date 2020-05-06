const mongoose = require('mongoose');
const { Schema } = mongoose;

const SourceSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    img: String,
    url: {
        type: String,
        unique: true
    }
});

const Source = mongoose.model('Source', SourceSchema);

module.exports = Source;