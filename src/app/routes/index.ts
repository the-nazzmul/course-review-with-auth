import { Router } from 'express';
import { CategoriesRoutes } from '../modules/categories/categories.route';
import { CourseRoutes } from '../modules/course/course.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/user.route';
import { BestCourseRoute } from '../modules/bestCourse/bestCourse.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/course',
    route: BestCourseRoute,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
