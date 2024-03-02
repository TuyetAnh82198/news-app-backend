const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoModel = new Schema({
  //Nội dung công việc
  task: { type: String, required: true },
  //username của người tạo ra task
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  //Task này đã hoàn thành hay chưa
  isDone: { type: Boolean, required: true },
});

module.exports = mongoose.model("todo", TodoModel);
