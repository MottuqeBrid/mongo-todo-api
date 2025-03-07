const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET active todos
router.get("/active", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive().select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({
      message: "There was an server side error",
    });
  }
});
// js static
router.get("/js", async (req, res) => {
  try {
    const data = await Todo.findByJs().select({
      _id: 0,
      __v: 0,
    });
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({
      message: "There was an server side error",
      error: e,
    });
  }
});
// GET todo by language
router.get("/language", async (req, res) => {
  try {
    const data = await Todo.find().byLanguage("js").select({
      _id: 0,
      __v: 0,
    });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({
      message: "There was an server side error",
      error: e,
    });
  }
});
// Get all the todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ status: "active" }).select({
      _id: 0,
      __v: 0,
    });
    // .limit(2);
    res.status(200).json(todos);
  } catch (e) {
    res.status(404).json({
      message: "There was an error fetching todos",
    });
  }
});

// GET a todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (e) {
    res.status(200).json({
      message: "There was an error fetching todo",
    });
  }
});

// post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json({
      message: "Todo was inserted successfully",
    });
  } catch (e) {
    res.status(200).json({
      message: "There was an server side error",
    });
  }
});

// post multiple todos
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).json({
      message: "Todos were inserted successfully",
    });
  } catch (e) {
    res.status(200).json({
      message: "There was an server side error",
    });
  }
});

// put todo
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      }
    );
    res.status(201).json({
      message: "Todo was updated successfully",
    });
  } catch (e) {
    res.status(200).json({
      message: "There was an server side error",
    });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(201).json({
      message: "Todo was deleted successfully",
    });
  } catch (e) {
    res.status(200).json({
      message: "There was an server side error",
    });
  }
});

module.exports = router;

//
