const express = require("express");
const app = express();

const mongoose = require('./database/mongoose');

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
 
//allow app to use json data
app.use(express.json());

app.listen (3000, () => console.log("Server connected on port: 3000") );
 