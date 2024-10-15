'use strict';
const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    blogPost: String,
    socialPost: String
}, {timestamps: true});

const NotesModel = mongoose.model('Notes', NotesSchema);

module.exports = NotesModel;
