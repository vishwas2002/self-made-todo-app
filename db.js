const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vishwas201102:Sharma938400@cluster0.bez0v.mongodb.net/todoApp")

const todoSchema = new mongoose.Schema({
    title : String,
    description : String

})
const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;
 