const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTodo = new Todo({
      user: req.user.userId,
      title,
      description,
      status,
    });
    await newTodo.save();
    res.status(200).json({ message: "Todo created", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { title, description, status },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo updated", todo });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error: error.message });
  }
};
