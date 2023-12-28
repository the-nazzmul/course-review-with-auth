import { JwtPayload } from 'jsonwebtoken';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';

const createReviewIntoDB = async (payload: TReview, user: JwtPayload) => {
  payload.createdBy = user._id;
  const result = (await ReviewModel.create(payload)).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt',
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
