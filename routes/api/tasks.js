const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  addTask,
  deleteTask,
  changeStatus,
} = require("../../controller/tasks");

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", addTask);

router.delete("/:id", deleteTask);

router.patch("/", changeStatus);

module.exports = router;
