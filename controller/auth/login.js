const bcrypt = require('bcrypt');
const db = require('../../server');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(emailCheckQuery, [email]);

    if (!result.rows.length > 0) {
      return res.status(401).json({ error: 'Email or password is wrong' });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    console.log('passwordCompare', passwordCompare);

    if (!passwordCompare) {
      console.log('error2');
      return res.status(401).json({ error: 'Email or password is wrong' });
    }

    const payload = {
      id: result.rows[0].id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '10d',
    });

    const querys = `
    UPDATE public.users
    SET token = $1
    WHERE id = $2
    RETURNING *;
    `;

    const newValues = [accessToken, result.rows[0].id];
    await db.query(querys, newValues);

    const userId = result.rows[0].id;

    res.status(201).json({ accessToken, userId });
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  login,
};
