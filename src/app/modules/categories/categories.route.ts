import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { categoriesValidationSchema } from './categories.validation';
import { CategoryControllers } from './categories.controller';
import { authChecker } from '../../middlewares/authChecker';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

//create categories
router.post(
  '/',
  authChecker(USER_ROLE.admin),
  validateRequest(categoriesValidationSchema),
  CategoryControllers.createCategory,
);
//get all categories
router.get('/', CategoryControllers.getAllCategories);

export const CategoriesRoutes = router;
