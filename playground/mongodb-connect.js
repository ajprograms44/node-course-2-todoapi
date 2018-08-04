// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


// var user = {name: 'Anthony', age: 25};
// var {name} = user;
// console.log(name);
//Object destructuring allows us to access object properties as variables



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB servers.')
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // });
    //Takes the string name of the collection to insert
    //insertOne allows us to insert documents into our collection, takes 2 args:
    //1. The object we want to store
    //2. A callback that fires when things go well or not

    // db.collection('Users').insertOne({
    //     name: 'Anthony',
    //     age: 25,
    //     location: 'Knoxville'
    // },(err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());

    // });

    client.close();
});
//takes two arguments:
//1. The URL where your database lives (eg Amazon WS URL or Heroku URL)
//2. A callback function that will fire after the connection has either succeeded or failed
