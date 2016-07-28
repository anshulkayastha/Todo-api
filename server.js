var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var nextTodoId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('ToDo API Root');
});

app.get('/todos', function(req, res) {
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    console.log('Todo ID param is '+todoId);
    var matchedTodo;

    todos.forEach(function(todo) {
        if(todo.id === todoId) {
            matchedTodo = todo;
        }
    });
    if(typeof matchedTodo !== 'undefined') {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

app.post('/todos', function(req, res) {
    var body = req.body;
    body.id = nextTodoId;
    nextTodoId++;
    todos.push(body);
    res.json(body);
});

app.listen(PORT, function() {
    console.log('Express Server started on Port '+PORT);
})