import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await UserServices.userLoginService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  });
});

const userPasswordChange = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await UserServices.changePassword(payload, user, res);

  if (result) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully',
      data: result,
    });
  }
});

export const UserControllers = {
  createUser,
  userLogin,
  userPasswordChange,
};
