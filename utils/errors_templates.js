const error401 = (res, errorMessage) => {
  return res.status(401).json({
    error: errorMessage,
  });
};

module.exports = { error401 };
