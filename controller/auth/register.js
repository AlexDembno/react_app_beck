const bcrypt = require('bcrypt');
const db = require('../../server');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY } = process.env;

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    task_id = '',
    password,
    token,
    avatar,
    children,
  } = req.body;

  try {
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const emailCheckResult = await db.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(409).json({ error: 'Email in use' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (
      first_name,
      last_name, email,
      task_id,
      password,
      token,
      avatar,
      children)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [
      first_name,
      last_name,
      email,
      task_id,
      hashPassword,
      token,
      avatar,
      children,
    ];
    const result = await db.query(query, values);

    const payload = {
      id: result.rows[0].id,
    };

    const accesstoken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '10d',
    });

    const querys = `
    UPDATE public.users
    SET token = $1
    WHERE id = $2
    RETURNING *;
    `;

    const newValues = [accesstoken, result.rows[0].id];
    await db.query(querys, newValues);

    res.status(201).json({ accesstoken });
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
};
