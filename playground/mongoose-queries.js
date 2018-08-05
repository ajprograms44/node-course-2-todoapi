const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user')

// var id = '5b67323003fcf41cd82e6315';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo',todo)
// });
// //Finding one document by anything other than id

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not found');
//     }
//     //Handle the situation if the ID doesnt exist
//     console.log('Todo by ID',todo)
// }).catch((e) => {
//     consoel.log(e);
// })
//Finding one document by id

var user_id = '5b6706ff5c755d154f207a6e';

User.findById(user_id).then((user) => {
    if (!user) {
        console.log('Unable to find user')
    }
    
    console.log('User by ID', user)
}, (e) => {
    console.log(e);
}). catch((e) => {
    console.log(e);
})



