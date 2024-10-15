'use strict';
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
const AI_SERVICE = process.env.AI_SERVICE;
const CHATGPT_MODEL = process.env.CHATGPT_MODEL;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL;
const Anthropic = require('@anthropic-ai/sdk');
const getTemplate = require('../utils/getTemplate');
const getSocialTemplate = require('../utils/getSocialTemplate');
const Notes = require('../models/notes');

console.log('using model: ', {CHATGPT_MODEL, ANTHROPIC_MODEL});
const client = new OpenAI({
    apiKey: CHATGPT_API_KEY
});


const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const generate = async(promt) => {
    if(AI_SERVICE === 'ANTHROPIC') {
        const msg = await anthropic.messages.create({
            model: ANTHROPIC_MODEL,
            max_tokens: 1024,
            messages: [{role: 'user', content: promt}]
        });
        return msg.content?.[0]?.text;
    }
    const chatCompletion = await client.chat.completions.create({
        messages: [{role: 'user', content: promt}],
        model: CHATGPT_MODEL
    });
    
    return chatCompletion?.choices?.[0]?.message?.content;
};

router.post('/generate/:noteId', async(req, res) => {
    const noteId = req.params.noteId;
    console.log('Generating blog post for: ', req.params.noteId);
    const currentNote = await Notes.findOne({_id: noteId});
    console.log('currentNote: ', currentNote._id);
    if(!currentNote) {
        return res.status(404).json({error: 'Note not foun!'});
    } else if (currentNote.content) {
        const content = await generate(getTemplate(`Title: ${currentNote.title} \n\n` + currentNote.content));
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
    console.log('currentNote: ', currentNote._id);
    if(!currentNote) {
        return res.status(404).json({error: 'Note not foun!'});
    } else if (currentNote.content && currentNote.blogPost) {
        const content = await generate(getSocialTemplate(`Title: ${currentNote.title} \n\n Blog Post Content: \n\n` + currentNote.content));
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
