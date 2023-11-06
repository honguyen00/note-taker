const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

const uuid = require('uniqid');
  

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newItem = {
            id: uuid('item-'),
            title,
            text
        };
        readAndAppend(newItem, './db/db.json');
        res.json(`Item added successfully`);
    }
});


module.exports = notes;