import bcrypt from "bcryptjs";

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

export default encryptPassword;
