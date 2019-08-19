import React from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      name:'',
      priority: 0,
      todos: []
    }
    //bind here
    this.getTodos = this.getTodos.bind(this);
    this.addTodos = this.addTodos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount(){
    this.getTodos()
  }

  getTodos(){
    axios
      .get('/api/todos')
      .then((data) => {
        this.setState({
          todos: data.data
        }, () => {
          console.log(this.state.todos)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  addTodos(todo){
    axios
      .post('/api/todos', todo)
      .then(() => {
        this.getTodos()
      })
      .catch((err)=> console.error(err))
  }

  updateTodo(index, change){
    let _id = this.state.todos[index]._id;
    let newPriority = this.state.todos[index].priority + change;
    axios
      .put(`/api/todos/${_id}`, { priority: newPriority })
      .then(() => {
        this.getTodos()
      })

  }

  deleteTodo(id){
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        this.getTodos()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handleChange (e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => {console.log(this.state)})
  }

  handleSubmit(e){
    e.preventDefault();
    this.addTodos({name: this.state.name, priority: this.state.priority})
  }

  handleDelete(e){
    let _id = this.state.todos[e.target.value]._id;
    this.deleteTodo(_id)
  }

  render(){
    return(
      <div>
        <h1>Todo List</h1>
        <h3>Add Todo:</h3>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name' onChange={this.handleChange} placeholder='todo'></input>
          <input type='number'name='priority' onChange={this.handleChange} placeholder='priority'></input>
          <button type='submit'>Add Todo</button>
        </form>
        <h3>Todos</h3>
        <div>
          {this.state.todos.map((todo, index) => {
            return <ListEntry 
              key ={index} 
              notakey={index} 
              todo={todo} 
              handleDelete={this.handleDelete}
              changePriority={this.updateTodo}
            />
          })}
        </div>
      </div>
    )
  }
}