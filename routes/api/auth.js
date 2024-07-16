const express = require("express");
const router = express.Router();
const db = require("./../../server");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, task_id = "" } = req.body;
  try {
    const query = `
      INSERT INTO users (first_name, last_name, email, task_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [first_name, last_name, email, task_id];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
