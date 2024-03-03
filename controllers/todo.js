const TodoModel = require("../models/Todo.js");
const UserModel = require("../models/User.js");
const io = require("../socket.js");

const addTask = async (req, res) => {
  try {
    const foundOwner = await UserModel.findOne({ username: req.body.owner });
    if (foundOwner) {
      const newTask = new TodoModel({
        task: req.body.task,
        owner: foundOwner._id,
        isDone: false,
      });
      await newTask.save();
      const tasks = await TodoModel.find({ owner: foundOwner._id });
      io.getIO().emit("todo", { action: "add", addResult: tasks });
      return res.status(200).json({ message: "Added!" });
    }
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (user) {
      const tasks = await TodoModel.find({ owner: user._id });
      // console.log(tasks);
      return res.status(200).json({ result: tasks });
    }
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

const updateTaskDone = async (req, res) => {
  try {
    const task = await TodoModel.findOne({ _id: req.params.id });
    if (task) {
      await TodoModel.updateOne(
        { _id: req.params.id },
        {
          isDone: !task.isDone,
        }
      );
      const tasks = await TodoModel.find({
        owner: req.session.user._id,
      });
      io.getIO().emit("todo", { action: "update", updateResult: tasks });
      return res.status(200).json({ message: "Updated!" });
    }
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    await TodoModel.deleteOne({ _id: req.params.id });
    const tasks = await TodoModel.find({ owner: req.session.user._id });
    io.getIO().emit("todo", { action: "delete", deleteResult: tasks });
    return res.status(200).json({ message: "Deleted!" });
  } catch (err) {
    return res.status(400).json({ err: "server-error" });
  }
};

module.exports = { addTask, getTasks, updateTaskDone, deleteTask };
