var mongoose = require('mongoose');


mongoose.Promise = global.Promise
// sets mongoose up to use promises

mongoose.connect('mongodb://localhost:27017/TodoApp');
// sets up the connection to the database

module.exports = {
    mongoose
}