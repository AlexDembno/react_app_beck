const express = require("express");
const app = express();
const db = require("./server");
const morgan = require("morgan");
require("dotenv").config();
const authRouter = require("./routes/api/auth");

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

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.use("/auth", authRouter);

app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
