const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const todoSchema = new Schema ({
  name: {type: String},
  priority: {type: Number}
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo