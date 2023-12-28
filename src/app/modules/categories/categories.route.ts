import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { categoriesValidationSchema } from './categories.validation';
import { CategoryControllers } from './categories.controller';

const router = express.Router();

//create categories
router.post(
  '/',
  validateRequest(categoriesValidationSchema),
  CategoryControllers.createCategory,
);
//get all categories
router.get('/', CategoryControllers.getAllCategories);

export const CategoriesRoutes = router;
