const bcrypt = require("bcryptjs");

const saltRounds = 10;

const setPassword = async (password) => {
  try {
    const generateSalt = await bcrypt.genSalt(saltRounds);
    try {
      const getHash = await bcrypt.hash(password, generateSalt);
      return getHash;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

const checkPassword = async (password, hashPassword) => {
  try {
    const check = await bcrypt.compare(password, hashPassword);
    return check;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setPassword, checkPassword };
