import bcrypt from 'bcrypt';
import { User } from '../User/user.model.js';


const Login = async ({ email, password }) => {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new Error('The user not found');
  }

  const isPasswordMatched = bcrypt.compareSync(password, userExist.password);
  if (!isPasswordMatched) {
    throw new Error('Invalid password');
  }
  return userExist;
};

export const AuthServices = { Login };
