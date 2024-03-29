const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    uid: {
        type: String,
        required: true,
        trim: true,
    },
    }, {
        timestamps: true,
    }
    );

const Post = model('Post', postSchema);

module.exports = Post;