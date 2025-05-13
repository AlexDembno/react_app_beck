const db = require('../../server');

const getUserKids = async (req, res) => {
  const user_id = req.user.id;

  try {
    const query = `
      SELECT id, user_id, first_name, last_name, password, token
      FROM public.children
      WHERE user_id = $1
    `;
    const { rows } = await db.query(query, [user_id]);

    res.status(200).json({
      total: rows.length,
      children: rows,
    });
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserKids,
};
