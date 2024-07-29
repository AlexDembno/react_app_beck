const express = require("express");
const router = express.Router();
const db = require("./../../server");

router.get("/", async (req, res) => {
  console.log("getTasks");
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`DELETE FROM tasks WHERE id = ${id}`);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
    });
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
  const { task_name, task_description, priority, status } = req.body;
  try {
    const query = `
      INSERT INTO tasks (task_name, task_description, priority, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [task_name, task_description, priority, status];
    await db.query(query, values);

    const result = await db.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
