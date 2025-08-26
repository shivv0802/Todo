const Todo = require('../models/todo')

async function createTask(req, res) {
  const newTodo = new Todo({ task: req.body.task });
  const saved = await newTodo.save();
  res.json(saved);
}

async function deleteTask(req, res) {
  const id = req.params.id;
  const deletedUser = await Todo.findByIdAndDelete(id);

  res.json(deletedUser)

}
async function updateTask(req, res) {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { task: req.body.task, completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
}

async function getTask(req, res) {
  const todos = await Todo.find();

  
  res.json(todos)
}

module.exports = { createTask, deleteTask, getTask, updateTask }