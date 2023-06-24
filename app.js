const express = require("express");
const app = express();
const { init, User, Todo } = require("./models/init");

app.use(express.json());

const PORT = process.env.PORT || 3000;
const UserController = require("./controlles/UserController");
const TodoController = require("./controlles/TodoController");

const userController = new UserController();
const todoController = new TodoController();
const { auth } = require("./middleware/auth");

app.post("/reg", userController.registration);
app.post("/auth", userController.authorization);
app.get("/me", auth, userController.getMe);

app.post("/todos", auth, todoController.create);
app.get("/todos", auth, todoController.getAll);
app.get("/todos/:id", auth, todoController.getOne);

app.post("/refresh-token", (req, res) => {
  try {
    const { token } = req.body;
  } catch (e) {
    return res.status(400);
  }
});

app.listen(PORT, async () => {
  await init();
  console.log("Server has been started on " + PORT + " port");
});
