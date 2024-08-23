const bcrypt = require('bcrypt');
const db = require('../../server');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY } = process.env;

const addKids = async (req, res) => {
  const user_id = req.user.id;

  const { first_name, last_name, password } = req.body;
  console.log('req.body', req.body);

  try {
    const firstNameCheckQuery = 'SELECT * FROM children WHERE first_name = $1';
    const firstNameCheckResult = await db.query(firstNameCheckQuery, [
      first_name,
    ]);

    if (firstNameCheckResult.rows.length > 0) {
      return res.status(409).json({ error: `${first_name} in use` });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const query = `
        INSERT INTO children (
        first_name,
        last_name,
        password,
        user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
    const values = [first_name, last_name, hashPassword, user_id];
    const result = await db.query(query, values);

    const payload = {
      id: result.rows[0].id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '10d',
    });

    const querys = `
      UPDATE public.children
      SET token = $1
      WHERE id = $2
      RETURNING *;
      `;

    const newValues = [accessToken, result.rows[0].id];
    await db.query(querys, newValues);

    res.status(201).json({ accessToken });
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addKids,
};
