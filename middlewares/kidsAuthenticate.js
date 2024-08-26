const jwt = require('jsonwebtoken');
const db = require('../server');
const { HttpError } = require('../helpers');

const { ACCESS_SECRET_KEY } = process.env;

const kidsAuthenticate = async (req, res, next) => {
  console.log('req.headers', req.headers);

  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const userCheckquery = 'SELECT * FROM children WHERE id = $1';
    const result = await db.query(userCheckquery, [id]);

    if (!result.rows.length > 0 || !result.rows[0].token) {
      next(HttpError(401));
    }
    req.user = result.rows[0];

    req.accesstoken = result.rows[0].token;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = { kidsAuthenticate };
