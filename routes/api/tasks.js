const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  addTask,
  deleteTask,
  changeStatus,
  editTask,
} = require("../../controller/tasks");

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", addTask);

router.delete("/:id", deleteTask);

router.patch("/", changeStatus);

router.patch("/edit/", editTask);

module.exports = router;
