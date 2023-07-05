const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 4444;

app.engine(".html", require("ejs").__express);

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");

app.use(bodyParser.urlencoded({ extended: false }));

// Dummy todos
let todos = [
  { id: "1", description: "Buy tofu" },
  { id: "2", description: "Water plants" },
  { id: "3", description: "Write htmlx todo app" },
];

app.get("/", function (req, res) {
  res.render("default", {
    title: "TODO App",
    todos,
  });
});

app.get("/todos/edit", function (req, res) {
  res.render("partials/todos/edit", {
    todos,
  });
});

app.get("/todos/list", function (req, res) {
  res.render("partials/todos/list", {
    todos,
  });
});

app.post("/todos/", function (req, res) {
  todos.push({
    id: +new Date(),
    description: req.body.new,
  });
  res.render("partials/todos/list", {
    todos,
  });
});

app.put("/todos/", function (req, res) {
  // validation ...

  // saving to db ...

  todos = Object.keys(req.body).map((todoId) => {
    return {
      id: todoId,
      description: req.body[todoId],
    };
  });

  res.render("partials/todos/list", {
    todos,
  });
});

app.listen(port, () => {
  console.log(`htmlx todo app listening on port ${port}`);
});
