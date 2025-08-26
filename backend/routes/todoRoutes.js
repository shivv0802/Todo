
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const {createTask, deleteTask, getTask, updateTask} = require('../controller/controllers')

router.post('/todos', createTask);

router.get('/todos', getTask);


router.put('/todos/:id', updateTask );


router.delete('/todos/:id', deleteTask);

module.exports = router;
