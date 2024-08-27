const kidsCurrent = async (req, res) => {
  console.log('req', req);

  // const user = req.user;
  const accessToken = req.accesstoken;
  console.log('accessToken', accessToken);

  res.status(200).json({
    accessToken,
  });
};

module.exports = { kidsCurrent };
