const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const morgan = require("morgan");
require("dotenv").config();
const authRouter = require("./routes/api/auth");
const tasksRouter = require("./routes/api/tasks");
const tasksListRouter = require("./routes/api/tasksList");

app.all("/anything", (req, res, next) => {
  console.log("Anything method.");
  next(); // передаємо управління далі
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5005, () => {
  console.log("Example app listening on port 5005!");
});

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.use("/auth", authRouter);

app.use("/tasks", tasksRouter);

app.use("/tasksList", tasksListRouter);

app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(express.urlencoded({ extended: false }));
