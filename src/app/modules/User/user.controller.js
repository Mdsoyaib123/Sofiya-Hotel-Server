
import catchAsync from '../../Utils/catchAsync.js';
import bcrypt from 'bcrypt';
import sendResponse from './../../Utils/sendResponse.js';
import { UserServices } from './user.service.js';



const createNewUser = catchAsync(async (req, res) => {
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    Number(10),
  );
  
  const userDataWithHashedPassword = {
    ...req.body,
    password: hashedPassword,
  };
  const result = await UserServices.RegisterUserIntoDb(
    userDataWithHashedPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const RetriveUsers = catchAsync(async (req, res) => {
  const result = await UserServices.RetriveAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const deactivateUser = catchAsync(async (req, res) => {
  const result = await UserServices.deactivateUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deactivated successfully',
    data: result,
  });
});
const activateUser = catchAsync(async (req, res) => {
  const result = await UserServices.activateUser(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User activated successfully',
    data: result,
  });
});



export const UserControllers = {
  createNewUser,
  RetriveUsers,
  deactivateUser,
  activateUser,
  
};
