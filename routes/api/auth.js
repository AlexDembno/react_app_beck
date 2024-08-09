const express = require('express');
const router = express.Router();
const db = require('./../../server');

const { register, login } = require('../../controller/auth');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/register', register);

router.post('/login', login);

module.exports = router;
