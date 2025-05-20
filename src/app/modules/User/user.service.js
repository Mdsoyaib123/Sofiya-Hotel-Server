import { User } from "./user.model.js";

const RegisterUserIntoDb = async ({ name, email, password }) => {
  // console.log('coming');
  // console.log('hashed password', password);
  const result = await User.create({
    email,
    password,
    name,
  });
  return result;
};

const RetriveAllUserFromDB = async () => {
  const result = await User.find({});
  return result;
};

const activateUser = async (id) => {
  const result = await User.findByIdAndUpdate(id, { activity: 'activated' });
  return result;
};

const deactivateUser = async (id) => {
  const result = await User.findByIdAndUpdate(id, { activity: 'deactivated' });
  return result;
};

export const UserServices = {
  RegisterUserIntoDb,
  RetriveAllUserFromDB,
  activateUser,
  deactivateUser,
};
