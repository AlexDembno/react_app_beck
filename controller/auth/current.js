const current = async (req, res) => {
  //   const user = req.user;
  const accessToken = req.accesstoken;

  res.status(200).json({
    accessToken,
  });
};

module.exports = { current };
