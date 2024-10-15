'use strict';

const express = require('express');
const hiroki = require('hiroki');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const NotesModel = require('./models/notes');
const generateRoute = require('./routes/generate');
const app = express();
const {PORT, DB_URL, DB_PORT, DB_NAME} = process.env;

const LISTEN_PORT = PORT || 8012;

// Importing model
hiroki.importModel(NotesModel);

//Mongoose connection
mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);

// Bodyparser added
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

//All enabled because this should run in docker
app.use(cors());

app.use('/api', generateRoute);

// Api route to pass data to hiroki
app.use('/api/*', async(req, res) => {
    const path = req.originalUrl;
    try {
        const resp = await hiroki.process(path, {
            method: req.method,
            body: req.body
        });
        res.status(resp.status || 200).json(resp);
    } catch (error) {
        res.status(error.status || 500).json({error: error.message});
    }
});


app.use('*', (req, res) => {
    res.status(404).json({message: '404 not found!'});
});

app.listen(LISTEN_PORT);
console.log(`Listening on port  ${LISTEN_PORT}`);
