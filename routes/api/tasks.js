const express = require("express");
const router = express.Router();
const db = require("./../../server");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM tasks WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { task_name, task_description, priority } = req.body;
  try {
    const query = `
      INSERT INTO tasks (task_name, task_description, priority)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [task_name, task_description, priority];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
