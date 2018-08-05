var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true //removes all leading and trailing spaces
    },
    completed: {
        type: Boolean,
        default: false //sets a default value for the property
    },
    completedAt: {
        type: Number,
        default: null
    }
});
// mongoose.model() creates a model that lets mongoose know how to store our data
// It takes two argument:
//1. The string name of the model
//2. An object that defines the various properties of the model

module.exports = {Todo};