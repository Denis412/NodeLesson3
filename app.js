const express = require("express");
const app = express();

const { Todo } = require("./models/todo");

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.findAll({});

    res.status(200).json({
      data: todos,
      paginatorInfo: {
        page: 1,
        perPage: 50,
        count: todos.length,
      },
    });
  } catch (e) {}
});

app.get("/todo/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    res.status(200).json({
      get_todo: todo,
    });
  } catch (e) {}
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json({
      create_todo: todo,
    });
  } catch (e) {}
});

app.patch("/todo/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
    }

    await todo.save();

    res.status(202).json({
      update_todo: todo,
    });
  } catch (e) {}
});

app.delete("/todo/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();

    res.status(204).json({
      delete_todo: todo,
    });
  } catch (e) {}
});

app.listen(PORT, () => {
  console.log("express started");
});
