const db = require("../../server");

const getTasks = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM tasks WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTask = async (req, res) => {
  const { task_name, task_description, priority, status } = req.body;
  try {
    const query = `
      INSERT INTO tasks (task_name, task_description, priority, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [task_name, task_description, priority, status];
    const { rows } = await db.query(query, values);
    console.log("rows", rows);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
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
};

const changeStatus = async (req, res) => {
  const { status, id } = req.body;
  try {
    const query = `
    UPDATE public.tasks
    SET status = $1
    WHERE id = $2
    RETURNING *;
    `;
    const values = [status, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const editTask = async (req, res) => {
  const { taskId, task_name, task_description, priority, status, startDate } = req.body;
  console.log('req.body', req.body);

  let values = [taskId];
  let updates = [];

  if (task_name) {
    values.push(task_name);
    updates.push(`task_name = $${values.length}`);
  }

  if (task_description) {
    values.push(task_description);
    updates.push(`task_description = $${values.length}`);
  }

  if (priority) {
    values.push(priority);
    updates.push(`priority = $${values.length}`);
  }

  if (status) {
    values.push(status);
    updates.push(`status = $${values.length}`);
  }

  if (startDate) {
    values.push(startDate);
    updates.push(`start_date = $${values.length}`);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const query = `
      UPDATE public.tasks
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING *;
    `;
    console.log("query", query);
    
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getTasks,
  getTaskById,
  addTask,
  deleteTask,
  changeStatus,
  editTask
};
