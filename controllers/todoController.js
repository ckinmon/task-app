var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('', { useNewUrlParser: true});

// Create a schema - this is the blueprint
var toDoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', toDoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass to view
        Todo.find({}, function(err, data){
            if (err) console.log(err);
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from view and add to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) console.log(err);
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete requested item from mongodb
        Todo.find({item: req.params.item.replace(/-/g, ' ')}).deleteOne(function(err, data){
            if (err) console.log(err);
            res.json(data);
        });
    });
}
