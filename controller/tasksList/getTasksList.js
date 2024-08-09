const db = require("../../server");

const getTasksList = async (req, res) => {

};

const getTasksListById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM tasks_list WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTasksList = async (req, res) => {
  const { task_list_name } = req.body;
  try {
    const query = `
      INSERT INTO tasks_list (task_list_name)
      VALUES ($1)
      RETURNING *;
    `;
    const values = [task_list_name];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const daleteTasksList = async (req, res) => {
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
};

module.exports = {
  getTasksList,
  getTasksListById,
  addTasksList,
  daleteTasksList,
};
