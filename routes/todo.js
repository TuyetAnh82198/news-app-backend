const express = require("express");

const {
  addTask,
  getTasks,
  updateTaskDone,
  deleteTask,
} = require("../controllers/todo.js");
const isAuth = require("../middleware/isAuth.js");

const route = express.Router();

route.post("/add", isAuth, addTask);
route.get("/get/:username", getTasks);
route.get("/done/:id", isAuth, updateTaskDone);
route.get("/deleteItem/:id", isAuth, deleteTask);

module.exports = route;
