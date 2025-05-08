const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./server'); // ✅ добавлено подключение к базе данных

const authRouter = require('./routes/api/auth');
const tasksRouter = require('./routes/api/tasks');
const tasksListRouter = require('./routes/api/tasksList');
const kidsRouter = require('./routes/api/kids');

const app = express();
app.use(cors());
app.use(express.json());

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
app.use('/kids', kidsRouter);
app.use('/tasks', tasksRouter);
app.use('/tasksList', tasksListRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5005; // ✅ добавлено для Render
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
