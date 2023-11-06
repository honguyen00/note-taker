// initialize notes as an express router
const notes = require('express').Router();
// helper functions to change file
const { readFromFile, readAndAppend, deleteFromFile } = require('../helpers/fsUtils');

// import npm package for ramdon id generator
const uuid = require('uniqid');
  
// get request for api/notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
});

// post request for api/notes
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

// delete request for api/notes
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