const express = require("express");
const router = express.Router();
const db = require("./../../server");

router.get("/", async (req, res) => {
  console.log("getTasksList");
  try {
    const result = await db.query("SELECT * FROM tasks_list");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM tasks_list WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { task_list_name } = req.body;
  try {
    const query = `
      INSERT INTO tasks_list (task_list_name)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [task_list_name];
    await db.query(query, values);
    const result = await db.query("SELECT * FROM tasks_list");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`DELETE FROM tasks_list WHERE id = ${id}`);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task list deleted successfully",
    });
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
