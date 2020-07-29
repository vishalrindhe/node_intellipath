 const mongoose = require ('mongoose');

 mongoose.Promise = global.Promise;

//27017 is default port by mongodb
//127.0.0.1 is custom protol by mongodb
//taskmanager is db name 

 mongoose.connect('mongodb://127.0.0.1:27017/taskmanager' , { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log("error"));

module.exports = mongoose;
