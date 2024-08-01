const express = require("express");
const router = express.Router();
const db = require("./../../server");

const {
  getTasksList,
  getTasksListById,
  addTasksList,
  daleteTasksList,
} = require("../../controller/tasksList");

router.get("/", getTasksList);

router.get("/:id", getTasksListById);

router.post("/", addTasksList);

router.delete("/:id", daleteTasksList);

module.exports = router;
