const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

const uuid = require('uniqid');
  

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newItem = {
            id: uuid('item-'),
            title,
            text
        };
        readAndAppend(newItem, './db/db.json');
        res.status(200).json(`Item added successfully`);
    }
    else {
        res.status(500).json('Error in adding item!')
    }
});

notes.delete('/:id', (req, res) => {
    if(req.params.id) {
        const noteId = req.params.id;
        deleteFromFile(noteId, './db/db.json');
        res.status(200).json('Delete note successfully!');
    } else {
        res.status(500).json('Error in deleting item!')
    } 
});


module.exports = notes;