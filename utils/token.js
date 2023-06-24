const jwt = require("jsonwebtoken");

const generateTokens = (payload) => {
  try {
    const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

    const access_token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" });
    const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      access_token,
      refresh_token,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = { generateTokens };
