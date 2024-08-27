const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');

const {
  getTasks,
  getTaskById,
  addTask,
  deleteTask,
  changeStatus,
  editTask,
} = require('../../controller/tasks');

router.get('/:id', getTasks);

router.get('/:id', getTaskById);

router.post('/', authenticate, addTask);

router.delete('/:id', deleteTask);

router.patch('/', changeStatus);

router.patch('/edit/', editTask);

module.exports = router;
