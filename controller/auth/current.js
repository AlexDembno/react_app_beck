const current = async (req, res) => {
  //   const user = req.user;
  const accesstoken = req.accesstoken;

  res.status(200).json({
    accesstoken,
  });
};

module.exports = { current };
