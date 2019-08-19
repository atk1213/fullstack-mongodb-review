const Todo = require('../database');

const controller = {
  get: (req, res) => {
    Todo.find({})
      .sort({ priority: -1 })
      .limit(5)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },
  post: (req, res) => {
    Todo.create(req.body)
      .then(() => {
        res.send('hi from post')
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },
  put: (req, res) => {
    let _id = req.params.id;
    let {priority} = req.body;
    Todo.findOneAndUpdate({_id}, {priority})
      .then(() => {
        res.send('hi from update')
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },
  delete: (req, res) => {
    let _id = req.params.id
    Todo.deleteOne({_id})
    .then(() => {
      res.send('hi from delete')
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  },

};

module.exports = controller;