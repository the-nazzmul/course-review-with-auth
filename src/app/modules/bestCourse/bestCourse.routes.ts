import express from 'express';
import { BestCourseControllers } from './bestCourse.controller';

const router = express.Router();

// Get the Best Course Based on Average Review (Rating)
router.get('/best', BestCourseControllers.getBestCourse);

export const BestCourseRoute = router;
