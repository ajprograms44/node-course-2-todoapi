require('./config/config')


const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
//Libraries

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
//Local files


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});
//This is a post request routed to the 'todos' page

app.get('/todos', (req, res) => {
//get request that returns our request and response objects
    Todo.find().then((todos) => {
    //use .find() to fetch all of the todos in the collection and then do something with them
    //the .then() call to take two functions: the success case function and the reject case function
        res.send({todos: todos})
        //send todos in an object back so we can atatch properties later
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
//':id' is a URL parameter that we can use in the url to indentify each todo
    var id = req.params.id
    //This is how we reference the id we want 
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        //We use return so the function can finish here
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo: todo});
    }).catch((e) => {
        res.status(400).send();
    })




})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        //We use return so the function can finish here
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } 
        
        res.status(200).send({todo: todo});

    }).catch((e) => {
        res.status(400).send();
    })
    
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed'])
    //We use the '_.pick' method to pull out just the fields we want users to be able to edit
    //First argument is what we want to edit, in this case the request body
    //Second argument is an array of what we want users to be able to edit

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
        //We use return so the function can finish here
    }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo: todo})
    }).catch((e) => {
        res.status(400).send();
    })
})





app.listen(port, () => {console.log(`Started on port ${port}`)});
//Starting up app and setting it to listen on port 3000

module.exports = {
    app
};



