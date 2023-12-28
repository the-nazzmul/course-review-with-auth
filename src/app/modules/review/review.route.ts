import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';
import { authChecker } from '../../middlewares/authChecker';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

// create review
router.post(
  '/',
  authChecker(USER_ROLE.user),
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
