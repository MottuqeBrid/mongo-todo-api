const express = require("express");
const mongoose = require("mongoose");

const todoHandler = require("./routeHandler/todoHandler"); // importing the todoHandler module

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

// database connect with mongoose
// ,{useNewUrlParser: true}
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log(`Connected successfully`))
  .catch((err) => console.error(err));

//   application routes
app.use("/todo", todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: err,
  });
}

app.listen(port, () => {
  console.log(`listening at ${port} on http://localhost:${port}`);
});
