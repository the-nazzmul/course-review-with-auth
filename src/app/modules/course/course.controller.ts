import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: {
      page,
      limit,
      total: result.totalCount,
    },
    data: result.courses,
  });
});

const getCourseReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getCourseReviewFromDB(courseId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getCourseReview,
  updateCourse,
};
