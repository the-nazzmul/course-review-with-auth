import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BestCourseServices } from './bestCourseService';

const getBestCourse = catchAsync(async (req, res) => {
  const result = await BestCourseServices.getBestCourseFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result[0],
  });
});

export const BestCourseControllers = {
  getBestCourse,
};
