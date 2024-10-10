const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const Todo= require('./db');
const todoSchema = require("./zod");

const app = express();

app.use(cors());
app.use(express.json());



app.post("/todos", (req,res)=>{
    const {title,description} = req.body; 
    const validationResult = todoSchema.safeParse(req.body)
    if(!validationResult.success){
        return res.status(400).json({
            errors : validationResult.error.format(),
        })
    }
    if(!title || !description)
    {
        return res.status(400).json({
            msg : "Both are required to be filled"
        })
    } 

    const todo = new Todo({
        title : title,
        description : description,
    })
    todo.save();

   res.status(200).json({
    msg : "Todo has been created successfully",
    todo : {
        title : title,
        description : description
    } 
   });

})
app.get("/todos", function(req, res){
    
    res.send("You are accessing the /todos GET route");
})

app.listen(3113);

