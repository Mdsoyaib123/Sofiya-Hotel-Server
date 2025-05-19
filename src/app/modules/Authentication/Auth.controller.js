
import { AuthServices } from './Auth.services.js';
import jwt from 'jsonwebtoken';
import catchAsync from '../../Utils/catchAsync.js';
import Config from '../../../app/Config/index.js';
import sendResponse from '../../Utils/sendResponse.js';


const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.Login(req.body);
  const payload = { id: result?._id, role: result?.role, email: result?.email,name:result.name };
  const accessToken = jwt.sign(payload, Config.jwt_secret ,{
    expiresIn: '1h',
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 1209600,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken },
  });
});



export const AuthControllers = { LoginUser };
