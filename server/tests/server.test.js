const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
},{
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