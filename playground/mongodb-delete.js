//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB servers.')
    const db = client.db('TodoApp')

    // deleteMany deletes all todos with the text: eat lunch
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
    //     console.log(res);
    // })

    //deleteOne: deletes a todo
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((res) => {
    //     console.log(res);
    //     console.log(res.result.n);
    // });


    //findOneAndDelete: deletes a todo and then returns what was deleted
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name:'Anthony'}).then((res) => {
    //     console.log(res);
    //     console.log(res.result.n)
    // })

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b659e13ac23b09cd7a35c2e')
    }).then((res) => {
        console.log('User Deleted:')
        console.log(res)
    });



    // client.close();
});
//takes two arguments:
//1. The URL where your database lives (eg Amazon WS URL or Heroku URL)
//2. A callback function that will fire after the connection has either succeeded or failed
