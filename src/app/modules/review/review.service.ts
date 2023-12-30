import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';
import { CourseModel } from '../course/course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createReviewIntoDB = async (payload: TReview, user: JwtPayload) => {
  payload.createdBy = user._id;

  const existingCourse = await CourseModel.findById(payload.courseId);

  if (!existingCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Course not found',
      'This course is not found!',
    );
  }

  const result = (await ReviewModel.create(payload)).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
