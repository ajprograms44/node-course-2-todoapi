//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB servers.')
    const db = client.db('TodoApp')


    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b652825ac23b09cd7a359a4')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });
//findOneAndUpdate finds a document with the specified argument and updates it with what we set
//the desired field we want changed


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b659e20ac23b09cd7a35c41')
    }, {
        $set: {
            name: 'Anthony'
        },
    
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });

    // client.close();
});

