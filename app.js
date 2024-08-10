const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const morgan = require('morgan');
require('dotenv').config();
const authRouter = require('./routes/api/auth');
const tasksRouter = require('./routes/api/tasks');
const tasksListRouter = require('./routes/api/tasksList');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(express.urlencoded({ extended: false }));

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/contact/:id', (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.use('/auth', authRouter);

app.use('/tasks', tasksRouter);

app.use('/tasksList', tasksListRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

app.listen(5005, () => {
  console.log('Example app listening on port 5005!');
});
