//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB servers.')
    const db = client.db('TodoApp')

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b650a85ac23b09cd7a34e0b')
    // }).toArray().then((docs)  => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })
    //Fetching all of the todos: 
    //Access the files with db.collection()
    //Use a method .find() without any arguments to fetch all todos
    //Use method .toArray(), it returns a promise that returns an array of todos
    //Since toArray() returns a promise, we can chaina .then() to control what happens

    //In order to query the database absed off of a condition, we can just insert
    // an object that matches up with the condition we want:
    // eg. db.collection('Todos').find({completed: false})....

    // db.collection('Todos').find().count().then((count)  => {
    //     console.log('Todos')
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    db.collection('Users').find({name:'Anthony'}).toArray().then((docs)  => {
        console.log('Username returned:')
        console.log(docs)
    }, (err) => {
        console.log('Unable to fetch user(s)', err)
        
    })




    // client.close();
});
//takes two arguments:
//1. The URL where your database lives (eg Amazon WS URL or Heroku URL)
//2. A callback function that will fire after the connection has either succeeded or failed
