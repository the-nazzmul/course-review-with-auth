import express from 'express';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { authChecker } from '../../middlewares/authChecker';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

//create a course
router.post(
  '/',
  authChecker(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

// get all course
router.get('/', CourseControllers.getAllCourses);

//Update a Course (Partial Update with Dynamic Update)**
router.put(
  '/:courseId',
  authChecker(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// Get Course by ID with Reviews**
router.get('/:courseId/reviews', CourseControllers.getCourseReview);

export const CourseRoutes = router;
