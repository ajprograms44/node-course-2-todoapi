const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},
{
    _id: new ObjectID(),
    text: 'Second test todo'
}];


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
    //removes all todos before each test case and calls done to finish the asynchronous method
});
//This is a 'testing lifecycle method'
//Lets us run some code before every single test case
//We can set up the database in a way that useful


describe('testing POST /todos', () => {
//describing our test cases

    it('Should create a new todo', (done) => {
    //first test case, specify done for asynchronous testing
        var text = 'Test todo text';
        request(app)
        //Making a request via supertest, pasing in the app we want to make the request on
            .post('/todos')
            //sets up a post request on the url
            .send({text})
            //sending data along with the request as the body which converts to json by supertest
            .expect(200)
            //expecting the status to be 200
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            //make an assertion about the body that comes back in side of the expect, 
            //make sure that the body that comes back actually has the text we created above in var text
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                    //At the end, we want to check what actually got stored in the mongodb collection
                    //We pass in a function with err and response to handle the results
                    //We run Todo.find() in roder to return a promise to make sure than whats returned is
                    //actually what we passed in for the text and it shows up in the database
                }).catch((e) => done(e));
                //catch is going to catch any errors that occur inside of the callback and pass it
                //into done();
            });
            
    });

    it('should not create Todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});


describe('GET /todos',() => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /todos/:id', () => {

    it('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    })

    it('Should return a 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    })

    it('Should should return 404 for non objectIDs',(done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    })
})

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexID);
        })
        .end((err, res) => {
            if (err){
                return done(err);
            }

            Todo.findById(hexID).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        

        });
    });

    it('Should return a 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return a 404 if objectID is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});