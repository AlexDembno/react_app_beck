const current = async (req, res) => {
  const userId = req.user.id;
  const accessToken = req.accesstoken;

  res.status(200).json({
    accessToken,
    userId,
  });
};

module.exports = { current };
