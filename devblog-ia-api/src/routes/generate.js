'use strict';
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
const getTemplate = require('../utils/getTemplate');
const getSocialTemplate = require('../utils/getSocialTemplate');
const Notes = require('../models/notes');

const CHATGPT_MODEL = 'gpt-4o'; //'gpt-4o-mini';

console.log('using model: ', CHATGPT_MODEL);
const client = new OpenAI({
    apiKey: CHATGPT_API_KEY
});

router.post('/generate/:noteId', async(req, res) => {
    const noteId = req.params.noteId;
    console.log('Generating blog post for: ', req.params.noteId);
    const currentNote = await Notes.findOne({_id: noteId});
    console.log('currentNote: ', currentNote);
    if(!currentNote) {
        return res.status(404).json({error: 'Note not foun!'});
    } else if (currentNote.content) {
        const chatCompletion = await client.chat.completions.create({
            messages: [{role: 'user', content: getTemplate(`Title: ${currentNote.title} \n\n` + currentNote.content)}],
            model: CHATGPT_MODEL
        });
    
        const content = chatCompletion?.choices?.[0]?.message?.content;
        console.log('content: ', content);
        currentNote.blogPost = content;
        await currentNote.save();
        return res.json({aiOutput: content});
    }
    return res.status(401).json({
        message: '"content" field required.'
    });
});


router.post('/generate-social/:noteId', async(req, res) => {
    const noteId = req.params.noteId;
    console.log('Generating blog post for: ', req.params.noteId);
    const currentNote = await Notes.findOne({_id: noteId});
    console.log('currentNote: ', currentNote);
    if(!currentNote) {
        return res.status(404).json({error: 'Note not foun!'});
    } else if (currentNote.content && currentNote.blogPost) {
        const chatCompletion = await client.chat.completions.create({
            messages: [{role: 'user', content: getSocialTemplate(`Title: ${currentNote.title} \n\n Blog Post Content: \n\n` + currentNote.content)}],
            model: CHATGPT_MODEL
        });
    
        const content = chatCompletion?.choices?.[0]?.message?.content;
        console.log('content: ', content);
        currentNote.blogPost = content;
        await currentNote.save();
        return res.json({aiOutput: content});
    }
    return res.status(401).json({
        message: '"content" and "blogPost" fields required.'
    });
});

module.exports = router;
