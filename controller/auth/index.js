const { register } = require('./register');
const { login } = require('./login');
const { current } = require('./current');
const { logout } = require('./logout');
const { addKids } = require('./addKids');
const { getUserKids } = require('./getUserKids');

module.exports = {
  register,
  login,
  current,
  logout,
  addKids,
  getUserKids,
};
