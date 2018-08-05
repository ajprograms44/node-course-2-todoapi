const express = require('express');
const bodyParser = require('body-parser');
//Libraries

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
//Local files


var app = express();

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

app.listen(3000, () => {console.log('Started on port 3000')});
//Starting up app and setting it to listen on port 3000

module.exports = {
    app
};



