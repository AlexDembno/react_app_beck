const { register } = require('./register');
const { login } = require('./login');
const { current } = require('./current');
const { logout } = require('./logout');
const { addKids } = require('./addKids');

module.exports = {
  register,
  login,
  current,
  logout,
  addKids,
};
