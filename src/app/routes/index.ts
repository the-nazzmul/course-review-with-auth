import { Router } from 'express';
import { CategoriesRoutes } from '../modules/categories/categories.route';
import { CourseRoutes } from '../modules/course/course.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoutes,
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
