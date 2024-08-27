const express = require('express');
const router = express.Router();
const db = require('./../../server');

const { authenticate } = require('../../middlewares');

const {
  getTasksList,
  getTasksListById,
  addTasksList,
  daleteTasksList,
} = require('../../controller/tasksList');

router.get('/:id', getTasksList);

router.get('/:id', getTasksListById);

router.post('/', authenticate, addTasksList);

router.delete('/:id', daleteTasksList);

module.exports = router;
