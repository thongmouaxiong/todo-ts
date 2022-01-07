import express from "express";
import { Todo } from "../controllers/todo.controller";
import { User } from "../controllers/user.controller";

const route = express()

// User Route
route.get('/users', User.getUserAll)
route.get('/user/:name', User.getUser)
route.post('/user', User.createUser)

// Task Route
route.get('/task/:token', Todo.getTask)
route.post('/task', Todo.createTask)
route.put('/task', Todo.editTask)
route.put('/task-confirm', Todo.confirmTask)
route.delete('/task', Todo.deleteTask)

// SubTask Route
route.get('/sub-task/:sub_id', Todo.getSubTask)
route.post('/sub-task', Todo.addSubTask)
route.put('/sub-task', Todo.editSubTask)
route.put('/sub-task-confirm', Todo.confirmSubTask)
route.delete('/sub-task', Todo.deleteSubTask)
 


export default route;