const bcrypt = require('bcrypt');
const db = require('../../server');
const jwt = require('jsonwebtoken');

const { ACCESS_SECRET_KEY } = process.env;

const kidsLogin = async (req, res) => {
  const { first_name, password } = req.body;
  try {
    const first_nameCheckQuery = 'SELECT * FROM children WHERE first_name = $1';
    const result = await db.query(first_nameCheckQuery, [first_name]);

    if (!result.rows.length > 0) {
      return res.status(401).json({ error: 'First_name or password is wrong' });
    }

    const passwordCompare = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    console.log('passwordCompare', passwordCompare);

    if (!passwordCompare) {
      console.log('error2');
      return res.status(401).json({ error: 'First_name or password is wrong' });
    }

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
  kidsLogin,
};
