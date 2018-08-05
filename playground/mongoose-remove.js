const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });
//removes all

// Todo.findOneAndRemove({}).then((result) => {
//     console.log(res)
// })

Todo.findByIdAndRemove('5b675061f952a21f8fc3ec07').then((todo) => {
    console.log(todo)
})

