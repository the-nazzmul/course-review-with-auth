import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

// create review
router.post(
  '/',
  validateRequest(ReviewValidations.reviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
