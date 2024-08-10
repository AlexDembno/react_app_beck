const db = require('./../../server');

const logout = async (req, res) => {
  const { id } = req.user;

  const querys = `
    UPDATE public.users
    SET token = $1
    WHERE id = $2
    RETURNING *;
    `;

  const newValues = ['', id];
  await db.query(querys, newValues);

  res.status(204).json({
    message: 'No Content',
  });
};

module.exports = {
  logout,
};
