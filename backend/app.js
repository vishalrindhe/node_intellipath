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
/* this will delete List along with its tasks */
app.delete('/lists/:listId' , (req, res) => {
    const deleteTasks = (list) => {
        Task.deleteMany({ _listId: list._id})
            .then(() => list)
            .catch((error) => console.log(error));
    };
    const list = List.findByIdAndDelete(req.params.listId)
            .then((list) => res.send(deleteTasks(list)))
            .catch((error) => console.log(error));
});

/* URL should look like this :
 http://localhost:3000/lists/:listId/tasks/:taskId */

 /*Crud for Tasks */
/*Get All Tasks */
 app.get('/lists/:listId/tasks', (req, res) => {
     Task.find({_listId: req.params.listId })
     .then((tasks) => res.send(tasks))
     .catch((error) => console.log(error));
 });
/* Create new Task */
 app.post('/lists/:listId/tasks', (req, res) => {
     (new Task({ '_listId': req.params.listId , 'title': req.body.title}))
     .save()
     .then((task) => res.send(task))
     .catch((error) => console.log(error));
 });
/*Get One particular Task */
 app.get('/lists/:listId/tasks/:taskId', (req , res) => {
    Task.findOne({ '_listId': req.params.listId, '_id': req.params.taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});
/* Update Task */
app.patch('/lists/:listId/tasks/:taskId', (req , res) => {
    Task.findOneAndUpdate({ '_listId': req.params.listId, '_id': req.params.taskId }, { $set: req.body })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});

/* Delete Task */
app.delete('/lists/:listId/tasks/:taskId', (req , res) => {
    Task.findOneAndDelete({ '_listId': req.params.listId, '_id': req.params.taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error));
});


app.listen (3000, () => console.log("Server connected on port: 3000"));