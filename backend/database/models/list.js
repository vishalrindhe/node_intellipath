const mongoose = require('mongoose');

//it takes an object
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength:3
    }
});

const List = mongoose.model('List', ListSchema);

module.exports = List;