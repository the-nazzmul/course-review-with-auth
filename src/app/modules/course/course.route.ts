import express from 'express';
import { CourseControllers } from './course.controller';
import { CourseValidation } from './course.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

//create a course
router.post(
  '/course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

// get all course
router.get('/courses', CourseControllers.getAllCourses);

//Update a Course (Partial Update with Dynamic Update)**
router.put(
  '/courses/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// Get Course by ID with Reviews**
router.get('/courses/:courseId/reviews', CourseControllers.getCourseReview);

// Get the Best Course Based on Average Review (Rating)
router.get('/course/best', CourseControllers.getBestCourse);


export const CourseRoutes = router;
