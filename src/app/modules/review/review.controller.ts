import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
