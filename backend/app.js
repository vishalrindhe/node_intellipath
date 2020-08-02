const express = require("express");
const app = express();

const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');

//allow app to use json data
app.use(express.json());
/*
CORS -CROSS ORIGIN REQUEST SECURITY
localhost:3000 - backend api
localhost:4200 - feontend 
//copy the CORS code as it is
it will allow only port 3000 and 4200
*/

app.use((req , res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE,");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/* Crud Operations add, update , Delete */
/*
Task need to pertform
List: Create, update, ReadOne, ReadAll, Delete
Task: Create, update, ReadOne, ReadAll, Delete
*/
/**
 * GET -> GET data
 * POST -> Save
 * PUT & PATCH -> Update
 * DELETE -> Delete
 */

 /* Get All Lists */
app.get('/lists', (req, res) => {
    List.find({})
    .then(lists => res.send(lists))
    .catch((error) => console.log(error));
});

/* Add a List */
app.post('/lists',(req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

/* Get Only one particular list */
app.get('/lists/:listId', (req ,res) => {
    List.find( { _id: req.params.listId })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

/* Upadte list */
app.patch('/lists/:listId', (req ,res) => {
    List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body})
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

/* Delete List */
app.delete('/lists/:listId' , (req, res) => {
    List.findByIdAndDelete(req.params.listId)
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.listen (3000, () => console.log("Server connected on port: 3000"));